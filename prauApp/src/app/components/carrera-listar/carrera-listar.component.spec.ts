import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarreraListarComponent } from './carrera-listar.component';

describe('CarreraListarComponent', () => {
  let component: CarreraListarComponent;
  let fixture: ComponentFixture<CarreraListarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CarreraListarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarreraListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
