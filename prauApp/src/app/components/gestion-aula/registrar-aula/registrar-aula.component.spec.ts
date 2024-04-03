import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarAulaComponent } from './registrar-aula.component';

describe('RegistrarAulaComponent', () => {
  let component: RegistrarAulaComponent;
  let fixture: ComponentFixture<RegistrarAulaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistrarAulaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistrarAulaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
