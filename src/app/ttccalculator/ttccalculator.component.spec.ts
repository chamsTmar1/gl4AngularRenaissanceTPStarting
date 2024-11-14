import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TTCCalculatorComponent } from './ttccalculator.component';

describe('TTCCalculatorComponent', () => {
  let component: TTCCalculatorComponent;
  let fixture: ComponentFixture<TTCCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TTCCalculatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TTCCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
