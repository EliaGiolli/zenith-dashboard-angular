import { Component, inject } from '@angular/core';
import { SettingServiceService } from '../../core/services/setting-service.service';
import { AppButtonComponent } from '../../shared/components/button/button.component';
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: 'app-sidebar',
  imports: [AppButtonComponent, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  private settings = inject(SettingServiceService);
  darkMode = this.settings.isDarkMode;

  onToggle() {
    this.settings.toggleDarkMode();
  }
}
