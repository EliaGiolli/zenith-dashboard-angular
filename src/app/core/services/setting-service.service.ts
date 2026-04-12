import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingServiceService {

  constructor() { }

  // Stato iniziale
  isDarkMode = signal<boolean>(false);

  toggleDarkMode() {
    // prev è il valore attuale del segnale (true o false)
    this.isDarkMode.update(prev => !prev);
  }
}
