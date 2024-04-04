import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluacionCriteriosComponent } from './evaluacion-criterios.component';

describe('EvaluacionCriteriosComponent', () => {
  let component: EvaluacionCriteriosComponent;
  let fixture: ComponentFixture<EvaluacionCriteriosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EvaluacionCriteriosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EvaluacionCriteriosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
