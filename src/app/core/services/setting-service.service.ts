import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingServiceService {

  constructor() { }

  isDarkMode = signal<boolean>(false);

  toggleDarkMode() {
    this.isDarkMode.update(prev => !prev);
  }
}
