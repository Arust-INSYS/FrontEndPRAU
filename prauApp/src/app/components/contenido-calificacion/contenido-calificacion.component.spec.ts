import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenidoCalificacionComponent } from './contenido-calificacion.component';

describe('ContenidoCalificacionComponent', () => {
  let component: ContenidoCalificacionComponent;
  let fixture: ComponentFixture<ContenidoCalificacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContenidoCalificacionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContenidoCalificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
