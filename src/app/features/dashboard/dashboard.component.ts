import { Component, signal } from '@angular/core';
import { ServerCardComponent } from '../../shared/components/server-card/server-card.component';
import { Server } from '../../core/models/server.model';

@Component({
  selector: 'app-dashboard',
  standalone: true, // Ricordati di esplicitarlo se non è di default
  imports: [ServerCardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  // Trasformiamo l'array in un Writable Signal
  // In NestJS sarebbe come definire lo stato iniziale di un modulo
  servers = signal<Server[]>([
    { id: 1, name: 'Web Server 1', status: 'online', cpuUsage: 45, memoryUsage: 67, lastUpdate: new Date() },
    { id: 2, name: 'Database Server', status: 'maintenance', cpuUsage: 23, memoryUsage: 89, lastUpdate: new Date() },
    { id: 3, name: 'API Server', status: 'offline', cpuUsage: 0, memoryUsage: 0, lastUpdate: new Date() }
  ]);

  handleServerSelection(id: number) {
    console.log('Server selezionato nella dashboard:', id);
    // Qui in futuro gestiremo l'apertura del dettaglio o lo stato "selected"
  }
}