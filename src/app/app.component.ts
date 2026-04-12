import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from "./features/sidebar/sidebar.component";
import { SettingServiceService } from './core/services/setting-service.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'zenith-dashboard';
  private settings = inject(SettingServiceService);
  isDark = this.settings.isDarkMode; 
}
