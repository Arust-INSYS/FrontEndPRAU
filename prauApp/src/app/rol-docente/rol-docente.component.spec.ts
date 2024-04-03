import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolDocenteComponent } from './rol-docente.component';

describe('RolDocenteComponent', () => {
  let component: RolDocenteComponent;
  let fixture: ComponentFixture<RolDocenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RolDocenteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RolDocenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
