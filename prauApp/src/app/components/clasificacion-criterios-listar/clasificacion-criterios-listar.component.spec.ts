import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClasificacionCriteriosListarComponent } from './clasificacion-criterios-listar.component';

describe('ClasificacionCriteriosListarComponent', () => {
  let component: ClasificacionCriteriosListarComponent;
  let fixture: ComponentFixture<ClasificacionCriteriosListarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClasificacionCriteriosListarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClasificacionCriteriosListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
