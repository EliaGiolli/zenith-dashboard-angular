import { HttpErrorResponse, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { catchError, delay, of, throwError } from 'rxjs';
import { Server } from '../models/server.model';

/**
 * Funzione di utilità per il mapping degli errori
 */
const handleHttpError = (error: HttpErrorResponse) => {
  let message = '';
  switch (error.status) {
    case 404:
      message = 'Risorsa non trovata: controlla l\'URL dell\'API';
      break;
    case 500:
      message = 'Errore del server: il finto backend è esploso';
      break;
    case 0:
      message = 'Errore di rete: il server è irraggiungibile';
      break;
    default:
      message = `Errore inaspettato: ${error.message}`;
  }
  console.error('%c [API ERROR]', 'color: #ff4b4b; font-weight: bold;', message);
  return throwError(() => new Error(message)); 
};

export const mockInterceptor: HttpInterceptorFn = (req, next) => {
  
  // 1. LOGICA MOCK
  if (req.url.includes('api/servers')) {
    const mockData: Server[] = [
      { id: 1, name: 'Web Server 1', status: 'online', cpuUsage: 45, memoryUsage: 62, lastUpdate: new Date() },
      { id: 2, name: 'Database Server', status: 'maintenance', cpuUsage: 23, memoryUsage: 88, lastUpdate: new Date() },
      { id: 3, name: 'API Gateway', status: 'offline', cpuUsage: 0, memoryUsage: 0, lastUpdate: new Date() }
    ];

    const dynamicData = mockData.map(s => ({
      ...s,
      cpuUsage: s.status === 'offline' ? 0 : Math.floor(Math.random() * 100),
      lastUpdate: new Date()
    }));

    // Simuliamo un errore casuale per testare l'interceptor
    if (Math.random() < 0.1) {
      return throwError(() => new HttpErrorResponse({ status: 500 })).pipe(
        delay(1000),
        catchError(handleHttpError) // Gestiamo l'errore anche qui!
      );
    }

    return of(new HttpResponse({ status: 200, body: dynamicData })).pipe(
      delay(1500)
    );
  }

  // 2. LOGICA RICHIESTE REALI
  return next(req).pipe(
    catchError(handleHttpError)
  );
};