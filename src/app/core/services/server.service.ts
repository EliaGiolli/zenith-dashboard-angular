// server.service.ts
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Server } from '../models/server.model';
import { catchError, map, of, startWith } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ServerService {
  
  private http = inject(HttpClient);
  private readonly API_URL = 'api/servers';

  getServers() {
    return this.http.get<Server[]>(this.API_URL);
  }

  getServersState() {
    return this.http.get<Server[]>(this.API_URL).pipe(
      map(data => ({ loading: false, data, error: null })),
      startWith({ loading: true, data: [], error: null }),
      catchError(err => of({ loading: false, data: [], error: err }))
    );
  }
}