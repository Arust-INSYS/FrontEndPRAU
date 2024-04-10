import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignaturaActualizarComponent } from './asignatura-actualizar.component';

describe('AsignaturaActualizarComponent', () => {
  let component: AsignaturaActualizarComponent;
  let fixture: ComponentFixture<AsignaturaActualizarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AsignaturaActualizarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AsignaturaActualizarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
