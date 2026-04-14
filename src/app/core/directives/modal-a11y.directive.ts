import { 
    Directive, 
    ElementRef, 
    inject, 
    AfterViewInit, 
    HostListener, 
    output 
} from '@angular/core';

@Directive({
  selector: 'dialog[appNativeModal]', 
  standalone: true
})
export class NativeModalDirective implements AfterViewInit {
  private el = inject(ElementRef<HTMLDialogElement>);
  
  closed = output<void>(); 

  // Questo è il metodo che mancava e che risolve l'errore NG2420
  ngAfterViewInit(): void {
    // Ora che la vista è pronta, possiamo mostrare il dialog nativo
    this.el.nativeElement.showModal();
  }

  @HostListener('close')
  onNativeClose() {
    this.closed.emit();
  }
}