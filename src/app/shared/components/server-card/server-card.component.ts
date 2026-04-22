import { CommonModule } from '@angular/common';
import { Component, computed, input, output } from '@angular/core';
import { Server } from '../../../core/models/server.model';
import { AppButtonComponent } from '../button/button.component';
import { StatusBadgeDirective } from '../../../core/directives/status-badge.directive';

@Component({
  selector: 'app-server-card',
  standalone: true,
  imports: [CommonModule, AppButtonComponent,StatusBadgeDirective],
  templateUrl: './server-card.component.html',
  styleUrls: ['./server-card.component.css']
})
export class ServerCardComponent {
  server = input.required<Server>();
  select = output<number>();

  statusLabel = computed(() => this.server().status.toUpperCase());

  buttonVariant = computed(() => {
    return this.server().status === 'offline' ? 'danger' : 'primary';
  });

  onDetailsClick() {
    this.select.emit(this.server().id);
  }
}