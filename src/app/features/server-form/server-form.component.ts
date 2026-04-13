import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AppFormCardComponent } from '../../shared/components/app-form-card/app-form-card.component';

@Component({
  selector: 'app-server-form',
  standalone: true,
  imports: [
    CommonModule, 
    RouterLink, 
    ReactiveFormsModule, 
    AppFormCardComponent
  ],
  templateUrl: './server-form.component.html',
  styleUrls: ['./server-form.component.css']
})
export class ServerFormComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);

  // Signal per gestire lo stato della "Server Action" simulata
  isPending = signal(false);

  // Definizione del Form con i Validators integrati di Angular
  serverForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    ip: ['', [Validators.required, Validators.pattern('^(?:[0-9]{1,3}\\.){3}[0-9]{1,3}$')]],
    status: ['online', Validators.required]
  });

  onSubmit() {
    if (this.serverForm.valid) {
      this.isPending.set(true);
      
      // Simuliamo la "Server Action"
      setTimeout(() => {
        console.log('Dati inviati:', this.serverForm.value);
        this.isPending.set(false);
        this.router.navigate(['/analytics']); // Torniamo alla dashboard
      }, 2000);
    }
  }
}