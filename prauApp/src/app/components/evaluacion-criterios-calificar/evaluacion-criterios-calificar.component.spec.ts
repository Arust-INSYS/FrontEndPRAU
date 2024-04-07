import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluacionCriteriosCalificarComponent } from './evaluacion-criterios-calificar.component';

describe('EvaluacionCriteriosCalificarComponent', () => {
  let component: EvaluacionCriteriosCalificarComponent;
  let fixture: ComponentFixture<EvaluacionCriteriosCalificarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EvaluacionCriteriosCalificarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EvaluacionCriteriosCalificarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
