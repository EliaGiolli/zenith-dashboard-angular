import { Component, model } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-input',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="search-box">
      <input 
        type="text" 
        [(ngModel)]="value" 
        placeholder="Filter instances..."
        class="search-input"
      />
      @if (value()) {
        <button class="clear-btn" (click)="value.set('')">✕</button>
      }
    </div>
  `,
  styleUrl: './search-input.component.css'
})
export class SearchInputComponent {
  // Questo definisce un Input() e un Output() allo stesso tempo
  value = model<string>(''); 
}