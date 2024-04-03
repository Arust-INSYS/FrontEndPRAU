import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarPeriodosAcComponent } from './listar-periodos-ac.component';

describe('ListarPeriodosAcComponent', () => {
  let component: ListarPeriodosAcComponent;
  let fixture: ComponentFixture<ListarPeriodosAcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListarPeriodosAcComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListarPeriodosAcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
