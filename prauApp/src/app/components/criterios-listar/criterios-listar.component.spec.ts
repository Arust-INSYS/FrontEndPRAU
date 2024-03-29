import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriteriosListarComponent } from './criterios-listar.component';

describe('CriteriosListarComponent', () => {
  let component: CriteriosListarComponent;
  let fixture: ComponentFixture<CriteriosListarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CriteriosListarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CriteriosListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
