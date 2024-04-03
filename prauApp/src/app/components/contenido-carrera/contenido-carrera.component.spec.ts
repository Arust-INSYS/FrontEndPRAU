import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenidoCarreraComponent } from './contenido-carrera.component';

describe('ContenidoCarreraComponent', () => {
  let component: ContenidoCarreraComponent;
  let fixture: ComponentFixture<ContenidoCarreraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContenidoCarreraComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContenidoCarreraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
