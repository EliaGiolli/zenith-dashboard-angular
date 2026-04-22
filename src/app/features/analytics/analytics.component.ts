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

  /**
   * 1. Global component state definition.
   * Converts the Service's Observable into a Signal using 'toSignal'.
   * This bridge automatically handles subscription management and memory cleanup.
   */
  state = toSignal(this.serverService.getPollingServersState(), {
    initialValue: { loading: true, data: [], error: null as any }
  });

  /**
   * 2. Derived Signals (Computed).
   * These extract specific values from the 'state' signal for template usage.
   * They reactively update whenever the underlying state changes.
   */
  isLoading = computed(() => this.state().loading);
  servers = computed(() => this.state().data);
  serverCount = computed(() => this.servers().length);

  /**
   * NOTE: ngOnInit, DestroyRef, or manual fetchServers() methods are no longer required.
   * The data stream is initiated as soon as the component is instantiated 
   * due to the declarative nature of the 'state' signal.
   */
}