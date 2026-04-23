import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppButtonComponent } from './button.component';
import { beforeEach, describe, it } from 'node:test';

describe('ButtonComponent', () => {
  let component: AppButtonComponent;
  let fixture: ComponentFixture<AppButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
