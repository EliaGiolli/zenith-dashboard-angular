import { Component, HostBinding, input } from '@angular/core';

@Component({
  selector: 'app-form-card',
  standalone: true,
  imports: [],
  templateUrl: './app-form-card.component.html',
  styleUrl: './app-form-card.component.css'
})
export class AppFormCardComponent {
  variant = input<'default' | 'contact'>('default');

  @HostBinding('attr.data-variant')
  get v() {
    return this.variant();
  }
}
