import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalificacionListarComponent } from './calificacion-listar.component';

describe('ClasificacionListarComponent', () => {
  let component: CalificacionListarComponent;
  let fixture: ComponentFixture<CalificacionListarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CalificacionListarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CalificacionListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
