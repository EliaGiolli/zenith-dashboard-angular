import { Component, computed, input, output } from '@angular/core';
import { Server } from '../../../core/models/server.model';

@Component({
  selector: 'app-server-card',
  imports: [],
  templateUrl: './server-card.component.html',
  styleUrl: './server-card.component.css'
})
export class ServerCardComponent {
  // Input reattivo
  server = input.required<Server>();

  // Output per comunicare al padre
  select = output<number>();

  // Stato derivato (quello che abbiamo discusso prima)
  statusLabel = computed(() => this.server().status.toUpperCase());

  onDetailsClick() {
    // Emettiamo l'ID del server al padre
    this.select.emit(this.server().id);
  }
}
