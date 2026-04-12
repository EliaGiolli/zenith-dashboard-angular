import { CommonModule } from '@angular/common';
import { Component, computed, input, output } from '@angular/core';
import { Server } from '../../../core/models/server.model';
import { getButtonClasses } from '../../utils/server-card.utils';

@Component({
  selector: 'app-server-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './server-card.component.html',
  styleUrls: ['./server-card.component.css']
})
export class ServerCardComponent {
  // Input reattivo
  server = input.required<Server>();

  // Output per comunicare al padre
  select = output<number>();

  // Stato derivato (quello che abbiamo discusso prima)
  statusLabel = computed(() => this.server().status.toUpperCase());

  // Computed gestisce le classi dinamiche esterne
  buttonClass = computed(() => getButtonClasses(this.server().status));

  onDetailsClick() {
    // Emettiamo l'ID del server al padre
    this.select.emit(this.server().id);
  }
}
