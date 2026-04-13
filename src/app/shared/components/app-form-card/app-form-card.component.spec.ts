import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppFormCardComponent } from './app-form-card.component';

describe('AppFormCardComponent', () => {
  let component: AppFormCardComponent;
  let fixture: ComponentFixture<AppFormCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppFormCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppFormCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
