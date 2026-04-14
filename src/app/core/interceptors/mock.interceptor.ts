import { HttpErrorResponse, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { catchError, delay, of, throwError } from 'rxjs';
import { Server } from '../models/server.model';

// 1. PERSISTENZA: Spostiamo i dati FUORI dalla funzione. 
// Questa variabile vivrà finché non ricarichi la pagina (F5).
let MOCK_SERVERS: Server[] = [
  { id: 1, name: 'Web Server 1', status: 'online', cpuUsage: 45, memoryUsage: 62, lastUpdate: new Date() },
  { id: 2, name: 'Database Server', status: 'maintenance', cpuUsage: 23, memoryUsage: 88, lastUpdate: new Date() },
  { id: 3, name: 'API Gateway', status: 'offline', cpuUsage: 0, memoryUsage: 0, lastUpdate: new Date() }
];

const handleHttpError = (error: HttpErrorResponse) => {
  const messages: Record<number, string> = {
    404: 'Risorsa non trovata: controlla l\'URL',
    500: 'Errore del server: il finto backend è esploso',
    0: 'Errore di rete: server irraggiungibile'
  };
  const message = messages[error.status] || `Errore inaspettato: ${error.message}`;
  console.error('%c [API ERROR]', 'color: #ff4b4b; font-weight: bold;', message);
  return throwError(() => new Error(message));
};

export const mockInterceptor: HttpInterceptorFn = (req, next) => {
  
  if (req.url.includes('api/servers')) {
    
    // --- GESTIONE POST (Creazione) ---
    if (req.method === 'POST') {
      const body = req.body as any;
      const newServer:Server = { 
        ...body, 
        id: MOCK_SERVERS.length + 1,
        cpuUsage: 0, 
        memoryUsage: 0, 
        lastUpdate: new Date() 
      };
      MOCK_SERVERS = [...MOCK_SERVERS, newServer]; // Aggiorniamo il "DB"
      
      return of(new HttpResponse({ status: 201, body: newServer })).pipe(delay(1000));
    }

    // --- GESTIONE GET (Lettura con dati dinamici) ---
    if (req.method === 'GET') {
      const dynamicData = MOCK_SERVERS.map(s => ({
        ...s,
        cpuUsage: s.status === 'offline' ? 0 : Math.floor(Math.random() * 100),
        lastUpdate: new Date()
      }));

      // Errore casuale ridotto al 5% per non essere fastidioso
      if (Math.random() < 0.05) {
        return throwError(() => new HttpErrorResponse({ status: 500 })).pipe(
          delay(500),
          catchError(handleHttpError)
        );
      }

      return of(new HttpResponse({ status: 200, body: dynamicData })).pipe(delay(800));
    }
  }

  return next(req).pipe(catchError(handleHttpError));
};