import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalisisUsoComponent } from './analisis-uso.component';

describe('AnalisisUsoComponent', () => {
  let component: AnalisisUsoComponent;
  let fixture: ComponentFixture<AnalisisUsoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnalisisUsoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnalisisUsoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
