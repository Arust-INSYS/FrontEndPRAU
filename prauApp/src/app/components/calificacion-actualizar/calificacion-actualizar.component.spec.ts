import { ComponentFixture, TestBed } from '@angular/core/testing';

import {CalificacionActualizarComponent } from './calificacion-actualizar.component';

describe('ClasificacionActualizarComponent', () => {
  let component: CalificacionActualizarComponent;
  let fixture: ComponentFixture<CalificacionActualizarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CalificacionActualizarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CalificacionActualizarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
