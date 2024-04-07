import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarPeriodoAcComponent } from './actualizar-periodo-ac.component';

describe('ActualizarPeriodoAcComponent', () => {
  let component: ActualizarPeriodoAcComponent;
  let fixture: ComponentFixture<ActualizarPeriodoAcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActualizarPeriodoAcComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActualizarPeriodoAcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
