import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NativeModalDirective } from './modal-a11y.directive';

/**
 * HOST COMPONENT
 * Since directives don't have their own template, we create a dummy 
 * component to apply the directive and test it in a real DOM scenario.
 */
@Component({
  standalone: true,
  imports: [NativeModalDirective],
  template: `
    <dialog appNativeModal (closed)="onClosed()">
      <p>Modal Content</p>
    </dialog>
  `
})
class TestHostComponent {
  closedCalled = false;
  onClosed() {
    this.closedCalled = true;
  }
}

describe('NativeModalDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let dialogEl: HTMLDialogElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent, NativeModalDirective]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    // Find the dialog element in the test DOM
    dialogEl = fixture.nativeElement.querySelector('dialog');
    
    /**
     * SPYING ON NATIVE METHODS
     * We spy on the native .showModal() method because it's a browser API.
     * We want to verify that Angular calls it correctly.
     */
    spyOn(dialogEl, 'showModal');
  });

  it('should call native showModal() on initialization', () => {
    // Triggers ngOnInit, ngAfterViewInit, etc.
    fixture.detectChanges(); 
    
    expect(dialogEl.showModal).toHaveBeenCalled();
  });

  it('should emit (closed) output when native dialog emits close event', () => {
    fixture.detectChanges();
    const hostComponent = fixture.componentInstance;

    // Manually dispatch the native 'close' event on the HTML element
    dialogEl.dispatchEvent(new Event('close'));

    expect(hostComponent.closedCalled).toBeTrue();
  });
});