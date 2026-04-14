import { Component, input, HostBinding } from '@angular/core';

@Component({
  selector: 'button[app-btn]',
  standalone: true,
  template: `<ng-content></ng-content>`,
  styles: `
    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0.6rem 1.2rem;
      border-radius: 0.5rem;
      font-weight: 600;
      cursor: pointer;
      border: 1px solid var(--border);
      transition: all 0.2s ease;
      font-family: inherit;
      background: var(--bg-card);
      color: var(--text-main);
    }

    :host([data-variant="primary"]) {
      background: var(--accent);
      color: white;
      border: none;
    }

    :host([data-variant="ghost"]) {
      background: transparent;
    }

    :host([data-variant="danger"]) {
      background: var(--status-offline);
      color: white;
      border: none;
    }

    :host([data-state="loading"]) {
      opacity: 0.6;
      pointer-events: none;
    }
  `
})
export class AppButtonComponent {
  variant = input<'primary' | 'ghost' | 'danger'>('primary');
  isPending = input(false);

  @HostBinding('attr.data-variant')
  get v() {
    return this.variant();
  }

  @HostBinding('attr.data-state')
  get s() {
    return this.isPending() ? 'loading' : null;
  }
}