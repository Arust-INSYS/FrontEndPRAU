import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignaturaListarComponent } from './asignatura-listar.component';

describe('AsignaturaListarComponent', () => {
  let component: AsignaturaListarComponent;
  let fixture: ComponentFixture<AsignaturaListarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AsignaturaListarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AsignaturaListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
