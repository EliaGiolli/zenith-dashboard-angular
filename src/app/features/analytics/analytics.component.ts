import { Component, inject, computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ServerService } from '../../core/services/server.service';
import { ServerCardComponent } from '../../shared/components/server-card/server-card.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [ServerCardComponent, RouterLink],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.css'
})
export class AnalyticsComponent {
  private serverService = inject(ServerService);

  /**
   * 1. Definizione dello stato globale del componente.
   * Trasformiamo l'Observable del service in un Signal.
   * Il Bridge gestisce automaticamente sottoscrizione e cleanup.
   */
  state = toSignal(this.serverService.getPollingServersState(), {
    initialValue: { loading: true, data: [], error: null as any }
  });

  /**
   * 2. Segnali derivati (Computed).
   * Estraggono i dati dallo 'state' per renderli disponibili al template.
   * Si aggiornano automaticamente ogni volta che lo stato cambia.
   */
  isLoading = computed(() => this.state().loading);
  servers = computed(() => this.state().data);
  serverCount = computed(() => this.servers().length);

  /**
   * NOTA: Non serve più ngOnInit, DestroyRef o fetchServers().
   * La chiamata parte non appena il componente viene istanziato 
   * grazie alla dichiarazione di 'state'.
   */
}