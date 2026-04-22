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
  // Injecting the ElementRef with a specific HTMLDialogElement type for better intellisense
  private el = inject(ElementRef<HTMLDialogElement>);
  
  /**
   * CUSTOM OUTPUT EVENT
   * Used to notify the parent component when the dialog is closed 
   * (either via the 'close' event or pressing the ESC key).
   */
  closed = output<void>(); 

  /**
   * LIFECYCLE HOOK: AfterViewInit
   * The native .showModal() method MUST be called after the view is fully initialized.
   * This triggers the browser's native modal behavior (backdrop, focus trapping).
   */
  ngAfterViewInit(): void {
    this.el.nativeElement.showModal();
  }

  /**
   * HOST LISTENER
   * Listens to the native HTML 'close' event emitted by the <dialog> element.
   * When triggered, it propagates the event to the Angular parent via the 'closed' output.
   */
  @HostListener('close')
  onNativeClose() {
    this.closed.emit();
  }
}