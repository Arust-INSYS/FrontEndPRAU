import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarreraActualizarComponent } from './carrera-actualizar.component';

describe('CarreraActualizarComponent', () => {
  let component: CarreraActualizarComponent;
  let fixture: ComponentFixture<CarreraActualizarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CarreraActualizarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarreraActualizarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
