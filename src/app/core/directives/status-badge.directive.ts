import { Directive, HostBinding, input, OnChanges } from '@angular/core';

@Directive({
  selector: '[appStatusBadge]', // Si usa come attributo: <span appStatusBadge="online">
  standalone: true
})
export class StatusBadgeDirective {
  // Signal input
  status = input<string>('offline', { alias: 'appStatusBadge' });

  @HostBinding('attr.data-status') get statusAttr() {
    return this.status(); // Chiamiamo il signal
  }

  @HostBinding('class.status-pill') readonly baseClass = true;

  // 3. ACCESSIBILITÀ: Ruolo semantico
  @HostBinding('attr.role') readonly role = 'status';

  // 4. ACCESSIBILITÀ: Notifica dinamica dei cambiamenti
  // 'polite' significa che lo screen reader aspetta che l'utente finisca di leggere prima di annunciare il cambio
  @HostBinding('attr.aria-live') readonly ariaLive = 'polite';

  // 5. ACCESSIBILITÀ: Traduzione dello stato in linguaggio naturale
  @HostBinding('attr.aria-label') get ariaLabel() {
    const translations: Record<string, string> = {
      'online': 'Stato del server: Operativo e attivo',
      'offline': 'Stato del server: Non raggiungibile o spento',
      'maintenance': 'Stato del server: In manutenzione programmata'
    };
    return translations[this.status()] || 'Stato del server: Sconosciuto';
  }
}
// Gli stili applicati da questa direttiva si trovano nel file style.css