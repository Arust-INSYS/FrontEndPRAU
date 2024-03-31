import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarDirectorComponent } from './calendar-director.component';

describe('CalendarDirectorComponent', () => {
  let component: CalendarDirectorComponent;
  let fixture: ComponentFixture<CalendarDirectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CalendarDirectorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CalendarDirectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
