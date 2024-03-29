import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClasificacionCriteriosActualizarComponent } from './clasificacion-criterios-actualizar.component';

describe('ClasificacionCriteriosActualizarComponent', () => {
  let component: ClasificacionCriteriosActualizarComponent;
  let fixture: ComponentFixture<ClasificacionCriteriosActualizarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClasificacionCriteriosActualizarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClasificacionCriteriosActualizarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
