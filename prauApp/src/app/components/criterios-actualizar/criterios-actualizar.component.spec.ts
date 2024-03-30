import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriteriosActualizarComponent } from './criterios-actualizar.component';

describe('CriteriosActualizarComponent', () => {
  let component: CriteriosActualizarComponent;
  let fixture: ComponentFixture<CriteriosActualizarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CriteriosActualizarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CriteriosActualizarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
