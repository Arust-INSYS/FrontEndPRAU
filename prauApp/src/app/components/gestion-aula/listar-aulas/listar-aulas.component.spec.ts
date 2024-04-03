import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarAulasComponent } from './listar-aulas.component';

describe('ListarAulasComponent', () => {
  let component: ListarAulasComponent;
  let fixture: ComponentFixture<ListarAulasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListarAulasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListarAulasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
