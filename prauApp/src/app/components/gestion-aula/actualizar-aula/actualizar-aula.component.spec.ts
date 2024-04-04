import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarAulaComponent } from './actualizar-aula.component';

describe('ActualizarAulaComponent', () => {
  let component: ActualizarAulaComponent;
  let fixture: ComponentFixture<ActualizarAulaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActualizarAulaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActualizarAulaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
