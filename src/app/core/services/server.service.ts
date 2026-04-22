// server.service.ts
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Server } from '../models/server.model';
import { catchError, delay, map, Observable, of, shareReplay, startWith, switchMap, tap, timer } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ServerService {
  
  private http = inject(HttpClient);
  private readonly API_URL = 'api/servers';

  getServers() {
    return this.http.get<Server[]>(this.API_URL);
  }

  getPollingServersState() {
    return timer(0, 15000).pipe(
      switchMap(() => this.http.get<Server[]>('api/servers')),
      map(data => ({ loading: false, data, error: null })),
      catchError(error => of({ loading: false, data: [], error })),
      shareReplay(1) 
    );
  }
  // src/app/core/services/server.service.ts
  addServer(server: any): Observable<any> {
    return this.http.post<any>('api/servers', server).pipe(
      tap(() => console.log('Server inviato con successo al mock'))
    );
  }
}