import { HttpErrorResponse, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { catchError, delay, of, throwError } from 'rxjs';
import { Server } from '../models/server.model';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';

/**
 * DATA PERSISTENCE LAYER (Mock)
 * This variable is declared outside the interceptor function to act as a 
 * "pseudo-database". It persists in memory as long as the application 
 * session is active (until a browser refresh).
 */
let MOCK_SERVERS: Server[] = [
  { id: 1, name: 'Web Server 1', status: 'online', cpuUsage: 45, memoryUsage: 62, lastUpdate: new Date() },
  { id: 2, name: 'Database Server', status: 'maintenance', cpuUsage: 23, memoryUsage: 88, lastUpdate: new Date() },
  { id: 3, name: 'API Gateway', status: 'offline', cpuUsage: 0, memoryUsage: 0, lastUpdate: new Date() }
];

/**
 * GLOBAL ERROR MAPPING
 * Centralized utility to transform standard HttpErrorResponse into 
 * user-friendly error messages.
 */
const handleHttpError = (error: HttpErrorResponse) => {
  const messages: Record<number, string> = {
    404: 'Resource not found: check the API URL',
    500: 'Server Error: the mock backend exploded',
    0: 'Network Error: server is unreachable'
  };
  const message = messages[error.status] || `Unexpected Error: ${error.message}`;
  console.error('%c [API ERROR]', 'color: #ff4b4b; font-weight: bold;', message);
  return throwError(() => new Error(message));
};

export const mockInterceptor: HttpInterceptorFn = (req, next) => {

  /**
   * SSR / PRERENDER DETECTION
   * We check if the code is running on the Server (during build/prerender) 
   * or in the Browser. This is crucial to avoid build timeouts.
   */
  const platformId = inject(PLATFORM_ID);
  const isServer = isPlatformServer(platformId);
  
  // Filter requests directed to our mock API
  if (req.url.includes('api/servers')) {
    
    // --- POST METHOD: CREATE SERVER ---
    if (req.method === 'POST') {
      const body = req.body as any; // Cast to bypass TS2698 spread error
      const newServer: Server = { 
        ...body, 
        id: MOCK_SERVERS.length + 1, // Simple auto-increment logic
        cpuUsage: 0, 
        memoryUsage: 0, 
        lastUpdate: new Date() 
      };

      // Immutable update of our mock database
      MOCK_SERVERS = [...MOCK_SERVERS, newServer]; 
      
      // Simulate network latency (1s) before returning the created resource
      return of(new HttpResponse({ status: 201, body: newServer })).pipe(delay(1000));
    }

    // --- GET METHOD: FETCH SERVERS ---
    if (req.method === 'GET') {
      /**
       * SMART LATENCY
       * If we are on the server (Prerendering), we use 0ms delay to prevent build timeouts.
       * In the browser, we use 800ms to test UI loaders/skeletons.
       */
      const responseDelay = isServer ? 0 : 800;

      // Generate dynamic metrics for a "live" feel in the dashboard
      const dynamicData = MOCK_SERVERS.map(s => ({
        ...s,
        cpuUsage: s.status === 'offline' ? 0 : Math.floor(Math.random() * 100),
        lastUpdate: new Date()
      }));

      /**
       * CHAOS ENGINEERING (Random Errors)
       * 5% chance of failure to test application resilience and error handling.
       */
      if (Math.random() < 0.05) {
        return throwError(() => new HttpErrorResponse({ status: 500 })).pipe(
          delay(500),
          catchError(handleHttpError)
        );
      }

      // Return the updated server list
      return of(new HttpResponse({ status: 200, body: dynamicData })).pipe(
        delay(responseDelay)
      );
    }
  }

  // Pass through for any request that doesn't match our mock URL
  return next(req).pipe(catchError(handleHttpError));
};