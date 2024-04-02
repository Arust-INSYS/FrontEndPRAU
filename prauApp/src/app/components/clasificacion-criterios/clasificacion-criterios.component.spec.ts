import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClasificacionCriteriosComponent } from './clasificacion-criterios.component';

describe('ClasificacionCriteriosComponent', () => {
  let component: ClasificacionCriteriosComponent;
  let fixture: ComponentFixture<ClasificacionCriteriosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClasificacionCriteriosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClasificacionCriteriosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
