import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { delay, of } from 'rxjs';
import { Server } from '../models/server.model';

export const mockInterceptor: HttpInterceptorFn = (req, next) => {
  // Se la richiesta è per i server, simuliamo una risposta dal backend
  if (req.url.includes('api/servers')) {
    // mock.interceptor.ts
const mockData: Server[] = [
  { 
    id: 1, 
    name: 'Web Server 1', 
    status: 'online', 
    cpuUsage: 45, 
    memoryUsage: 62, 
    lastUpdate: new Date() 
  },
  { 
    id: 2, 
    name: 'Database Server', 
    status: 'maintenance', 
    cpuUsage: 23, 
    memoryUsage: 88, 
    lastUpdate: new Date() 
  },
  { 
    id: 3, 
    name: 'API Gateway', 
    status: 'offline', 
    cpuUsage: 0, 
    memoryUsage: 0, 
    lastUpdate: new Date() 
  }
];

    console.log('%c [MOCK API] Intercettata richiesta:', 'color: #10b981', req.url);
    
    // Restituiamo i dati con un ritardo di 1.5 secondi per vedere lo shimmer (caricamento)
    return of(new HttpResponse({ status: 200, body: mockData })).pipe(
      delay(1500)
    );
  }

  // Se non è la nostra API, lascia passare la richiesta normalmente
  return next(req);
};