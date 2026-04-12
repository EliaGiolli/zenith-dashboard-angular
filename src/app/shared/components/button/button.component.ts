import { Component, input, computed } from '@angular/core';

@Component({
  selector: 'button[app-btn]',
  standalone: true,
  // Usiamo ng-content per proiettare il testo/icone dentro il bottone
  template: `<ng-content></ng-content>`,
  host: {
    '[class]': 'computedClasses()',
  },
  styles: `
    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0.6rem 1.2rem;
      border-radius: 0.5rem;
      font-weight: 600;
      cursor: pointer;
      border: 1px solid transparent;
      transition: all 0.2s ease;
      font-family: inherit;
    }
    :host(.btn-primary) { 
      background: var(--accent); 
      color: white; 
    }
    :host(.btn-ghost) { 
      background: transparent; 
      border: 1px solid var(--border); 
      color: var(--text-main); 
    }
    :host(.btn-ghost:hover) { 
      background: var(--border); 
    }
    :host(.btn-danger) { background: var(--status-offline); color: white; }
    :host(.btn-danger:hover) { opacity: 0.9; }
  `
})
export class AppButtonComponent {
  variant = input<'primary' | 'ghost' | 'danger'>('primary');
  computedClasses = computed(() => `btn-${this.variant()}`);
}