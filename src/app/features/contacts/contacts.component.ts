import { Component, signal } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { AppFormCardComponent } from '../../shared/components/app-form-card/app-form-card.component';
import { AppButtonComponent } from '../../shared/components/button/button.component';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [ReactiveFormsModule, AppFormCardComponent, AppButtonComponent],
  templateUrl: './contacts.component.html',
})
export class ContactsComponent {

  isSending = signal(false);
  success = signal(false);

  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    message: new FormControl('', [Validators.required, Validators.minLength(10)]),
  });

  onSubmit() {
    if (this.form.invalid) return;

    this.isSending.set(true);
    this.success.set(false);

    setTimeout(() => {
      this.isSending.set(false);
      this.success.set(true);
      this.form.reset();
    }, 1500);
  }
}