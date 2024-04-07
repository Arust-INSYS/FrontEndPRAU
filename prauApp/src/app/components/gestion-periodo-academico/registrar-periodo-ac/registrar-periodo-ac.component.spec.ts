import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarPeriodoAcComponent } from './registrar-periodo-ac.component';

describe('RegistrarPeriodoAcComponent', () => {
  let component: RegistrarPeriodoAcComponent;
  let fixture: ComponentFixture<RegistrarPeriodoAcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistrarPeriodoAcComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistrarPeriodoAcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
