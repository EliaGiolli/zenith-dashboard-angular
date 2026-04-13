// server.service.ts
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Server } from '../models/server.model';
import { catchError, map, of, startWith, switchMap, timer } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ServerService {
  
  private http = inject(HttpClient);
  private readonly API_URL = 'api/servers';

  getServers() {
    return this.http.get<Server[]>(this.API_URL);
  }

  getPollingServersState() {
    // timer(ritardo_iniziale, intervallo)
    return timer(0, 5000).pipe( 
      // Ogni 5 secondi, "passiamo" alla chiamata HTTP
      switchMap(() => this.http.get<Server[]>(this.API_URL).pipe(
        map(data => ({ loading: false, data, error: null })),
        catchError(err => of({ loading: false, data: [], error: err }))
      )),
      // Lo stato iniziale di caricamento lo diamo solo la primissima volta
      startWith({ loading: true, data: [], error: null })
    );
  }
}