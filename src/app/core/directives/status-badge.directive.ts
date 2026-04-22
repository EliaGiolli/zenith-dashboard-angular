import { Directive, HostBinding, input } from '@angular/core';

@Directive({
  selector: '[appStatusBadge]', // Applied as an attribute: <span appStatusBadge="online">
  standalone: true
})
export class StatusBadgeDirective {
  /**
   * SIGNAL INPUT
   * Uses the modern Signal-based input API.
   * Alias 'appStatusBadge' allows direct binding to the directive selector.
   */
  status = input<string>('offline', { alias: 'appStatusBadge' });

  /**
   * DATA ATTRIBUTE BINDING
   * Binds the signal value to a 'data-status' attribute for CSS styling.
   * Example: [data-status="online"] { background: green; }
   */
  @HostBinding('attr.data-status') get statusAttr() {
    return this.status(); 
  }

  // Applies a static base class for general badge styling
  @HostBinding('class.status-pill') readonly baseClass = true;

  /**
   * ACCESSIBILITY (A11y): Semantic Role
   * Informs assistive technologies that this element represents a status indicator.
   */
  @HostBinding('attr.role') readonly role = 'status';

  /**
   * ACCESSIBILITY (A11y): Dynamic Announcements
   * 'polite' ensures screen readers announce status changes without 
   * interrupting the user's current task.
   */
  @HostBinding('attr.aria-live') readonly ariaLive = 'polite';

  /**
   * ACCESSIBILITY (A11y): Natural Language Translation
   * Maps technical status keys to descriptive labels for screen readers.
   */
  @HostBinding('attr.aria-label') get ariaLabel() {
    const translations: Record<string, string> = {
      'online': 'Server status: Operational and active',
      'offline': 'Server status: Unreachable or powered off',
      'maintenance': 'Server status: Under scheduled maintenance'
    };
    return translations[this.status()] || 'Server status: Unknown';
  }
}