import { Component, inject, signal, computed } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { ServerSchema } from '../../core/schemas/server.schema';
import { ServerService } from '../../core/services/server.service';
import { AppFormCardComponent } from '../../shared/components/app-form-card/app-form-card.component';

@Component({
  selector: 'app-server-form',
  standalone: true,
  imports: [ReactiveFormsModule, AppFormCardComponent], 
  templateUrl: './server-form.component.html'
})
export class ServerFormComponent {
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private serverService = inject(ServerService);

  // Stato della "Server Action"
  isPending = signal(false);
  success = signal(false);

  // Definizione del Form
  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    ip: ['', [Validators.required, Validators.pattern(/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/)]],
    status: ['online', Validators.required]
  });

  // Signal che osserva il valore del form in tempo reale
  formValue = toSignal(this.form.valueChanges);

  // Logica derivata: mostriamo un'anteprima del server mentre l'utente scrive
  previewLabel = computed(() => {
    const val = this.formValue();
    return val?.name ? `Creazione: ${val.name} (${val.ip || '0.0.0.0'})` : 'In attesa di dati...';
  });

  async onSubmit() {
    if (this.form.invalid) return;

    this.isPending.set(true);
    
    // Validazione extra con Zod
    const validation = ServerSchema.safeParse(this.form.value);
    
    if (!validation.success) {
      console.error("Zod Validation Failed:", validation.error.format());
      this.isPending.set(false);
      return;
    }

    // Nel metodo onSubmit(), dentro il next della sottoscrizione
    this.serverService.addServer(validation.data).subscribe({
      next: () => {
        this.success.set(true);
        this.isPending.set(false);
        
        // Piccolo delay per far vedere il feedback di successo all'utente
        setTimeout(() => {
          this.router.navigate(['/analytics']);
        }, 1500);
      },
      error: () => {
        this.isPending.set(false);
        // Gestione errore (magari un altro signal 'error')
      }
    });
  }
}