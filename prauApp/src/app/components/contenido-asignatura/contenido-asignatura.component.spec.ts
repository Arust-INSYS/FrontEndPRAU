import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenidoAsignaturaComponent } from './contenido-asignatura.component';

describe('ContenidoAsignaturaComponent', () => {
  let component: ContenidoAsignaturaComponent;
  let fixture: ComponentFixture<ContenidoAsignaturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContenidoAsignaturaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContenidoAsignaturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
