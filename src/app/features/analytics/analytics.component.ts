import { Component, inject, computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ServerService } from '../../core/services/server.service';
import { ServerCardComponent } from '../../shared/components/server-card/server-card.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AppButtonComponent } from "../../shared/components/button/button.component";

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [
    ServerCardComponent,
    RouterLink,
    RouterOutlet,
    AppButtonComponent
  ],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.css'
})

export class AnalyticsComponent {
  private serverService = inject(ServerService);

  state = this.serverService.state; 

  isLoading = computed(() => this.state().loading);
  servers = computed(() => this.state().data);
}