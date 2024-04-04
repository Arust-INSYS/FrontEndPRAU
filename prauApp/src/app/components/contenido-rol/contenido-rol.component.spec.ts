import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenidoRolComponent } from './contenido-rol.component';

describe('ContenidoRolComponent', () => {
  let component: ContenidoRolComponent;
  let fixture: ComponentFixture<ContenidoRolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContenidoRolComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContenidoRolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
