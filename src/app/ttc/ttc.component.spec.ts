import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TtcComponent } from './ttc.component';

describe('TtcComponent', () => {
  let component: TtcComponent;
  let fixture: ComponentFixture<TtcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TtcComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TtcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
