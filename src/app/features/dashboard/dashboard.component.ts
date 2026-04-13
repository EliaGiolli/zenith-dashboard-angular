import { Component, computed, effect, signal } from '@angular/core';
import { ServerCardComponent } from '../../shared/components/server-card/server-card.component';
import { SearchInputComponent } from '../../shared/components/search-input/search-input.component';
import { Server } from '../../core/models/server.model';

@Component({
  selector: 'app-dashboard',
  standalone: true, 
  imports: [ServerCardComponent, SearchInputComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  selectedServerId = signal<number | null>(null);
  inspectionCount = signal<number>(0);
  searchQuery = signal('');
  constructor() {
    // Si attiva automaticamente al primo avvio e ogni volta che inspectionCount cambia
    effect(() => {
      const count = this.inspectionCount();
      console.log(`Effect: Il contatore è cambiato a ${count}`);
      
      if (count > 10) {
        console.warn('⚠️ Attenzione: Analisi intensiva rilevata!');
      }
    });
  }

  servers = signal<Server[]>([
    { id: 1, name: 'Web Server 1', status: 'online', cpuUsage: 45, memoryUsage: 67, lastUpdate: new Date() },
    { id: 2, name: 'Database Server', status: 'maintenance', cpuUsage: 23, memoryUsage: 89, lastUpdate: new Date() },
    { id: 3, name: 'API Server', status: 'offline', cpuUsage: 0, memoryUsage: 0, lastUpdate: new Date() }
  ]);

  // Definiamo lo Stato Derivato
  statusMessage = computed(() => {
    const count = this.inspectionCount();
    if (count === 0) return 'Nessuna attività';
    if (count <= 5) return 'Monitoraggio attivo';
    return 'Analisi intensiva';
  });

  // Computed filtra i server in tempo reale
  filteredServers = computed(() => {
    const term = this.searchQuery().toLowerCase().trim();
    if (!term) return this.servers();

    return this.servers().filter(s => 
      s.name.toLowerCase().includes(term)
    );
  });

  handleServerSelection(id: number) {
    this.selectedServerId.set(id);
    // Aggiorniamo il contatore
    this.inspectionCount.update(prev => prev + 1);
  }
}