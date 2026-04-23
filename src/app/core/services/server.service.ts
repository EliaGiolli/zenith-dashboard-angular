import { Injectable, signal, computed } from '@angular/core';
import { of, delay, tap } from 'rxjs';
import { Server } from '../models/server.model';

@Injectable({ providedIn: 'root' })
export class ServerService {
  /**
   * INTERNAL STATE
   * We use a private signal to hold the source of truth.
   * This mimics a local database.
   */
  private serversSignal = signal<Server[]>([
    { id: 1, name: 'Prod-Web-01', status: 'online', cpuUsage: 42, memoryUsage: 55, lastUpdate: new Date() },
    { id: 2, name: 'Auth-Service', status: 'maintenance', cpuUsage: 12, memoryUsage: 80, lastUpdate: new Date() },
    { id: 3, name: 'Backup-Node', status: 'offline', cpuUsage: 0, memoryUsage: 0, lastUpdate: new Date() }
  ]);

  /**
   * PUBLIC STATE (Read-Only)
   * Components will consume this state. We wrap it in a standard 
   * object structure to keep consistency with the previous API logic.
   */
  readonly state = computed(() => ({
    loading: false,
    data: this.serversSignal(),
    error: null
  }));

  /**
   * FETCH METHOD
   * Returns an Observable of the current state.
   * Useful for toSignal() in components to maintain the same architecture.
   */
  getServers() {
    return of(this.state());
  }

  /**
   * ADD METHOD
   * Simulates a POST request. It updates the local signal, 
   * which automatically triggers updates in all listening components.
   */
  addServer(server: Partial<Server>) {
    const newServer = {
      ...server,
      id: this.serversSignal().length + 1,
      cpuUsage: 0,
      memoryUsage: 0,
      lastUpdate: new Date()
    } as Server;

    // Simulate a brief network delay (e.g., 500ms) for UI testing (spinner/pending)
    // but we update the signal inside a tap()
    return of(newServer).pipe(
      delay(500),
      tap(created => {
        this.serversSignal.update(list => [...list, created]);
      })
    );
  }
}