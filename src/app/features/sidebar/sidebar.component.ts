import { Component, inject } from '@angular/core';
import { SettingServiceService } from '../../core/services/setting-service.service';
import { AppButtonComponent } from '../../shared/components/button/button.component';

@Component({
  selector: 'app-sidebar',
  imports: [AppButtonComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  // Inietto l'intero servizio
  private settings = inject(SettingServiceService);

  // Creo un riferimento locale per comodità (opzionale)
  darkMode = this.settings.isDarkMode;

  onToggle() {
    // Chiamo il metodo del servizio
    this.settings.toggleDarkMode();
  }
}
