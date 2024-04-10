import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficaDirectorComponent } from './grafica-director.component';

describe('GraficaDirectorComponent', () => {
  let component: GraficaDirectorComponent;
  let fixture: ComponentFixture<GraficaDirectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GraficaDirectorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GraficaDirectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
