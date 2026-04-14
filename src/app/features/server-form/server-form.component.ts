import { Component, inject, signal, computed } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { ServerSchema } from '../../core/schemas/server.schema';
import { ServerService } from '../../core/services/server.service';
import { AppFormCardComponent } from '../../shared/components/app-form-card/app-form-card.component';
import { AppButtonComponent } from '../../shared/components/button/button.component';
import { NativeModalDirective } from '../../core/directives/modal-a11y.directive';

@Component({
  selector: 'app-server-form',
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    AppFormCardComponent, 
    AppButtonComponent,
    NativeModalDirective
  ], 
  templateUrl: './server-form.component.html'
})
export class ServerFormComponent {
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private serverService = inject(ServerService);

  // Stato della "Server Action"
  isPending = signal(false);
  success = signal(false);
  error = signal<string | null>(null);

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
  
  const validation = ServerSchema.safeParse(this.form.value);
  if (!validation.success) {
    this.isPending.set(false);
    return;
  }

  this.serverService.addServer(validation.data).subscribe({
    next: () => {
      this.success.set(true); // Mostra il messaggio "✨ Nodo Creato!" nel template
      this.isPending.set(false);
      
      // Chiudiamo dopo un breve delay per dare soddisfazione all'utente
      setTimeout(() => this.onClose(), 1500);
    },
    error: (err) => {
      this.isPending.set(false);
      // Qui potresti impostare un signal error('Ops, riprova!')
    }
  });
}
  onClose() {
    // Se usi le rotte, torna alla dashboard
    this.router.navigate(['/analytics']);
  }
}