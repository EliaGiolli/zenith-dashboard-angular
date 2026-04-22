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
  templateUrl: './server-form.component.html',
  styleUrls: ['./server-form.component.css']
})
export class ServerFormComponent {
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private serverService = inject(ServerService);

  isPending = signal(false);
  success = signal(false);
  error = signal<string | null>(null);

  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    ip: ['', [Validators.required, Validators.pattern(/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/)]],
    status: ['online', Validators.required]
  });

  formValue = toSignal(this.form.valueChanges);

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
      this.success.set(true); 
      this.isPending.set(false);
      
      setTimeout(() => this.onClose(), 1500);
    },
    error: (err) => {
      this.isPending.set(false);
    }
  });
}
  onClose() {
    this.router.navigate(['/analytics']);
  }
}