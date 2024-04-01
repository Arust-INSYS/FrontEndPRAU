import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskIncompletComponent } from './task-incomplet.component';

describe('TaskIncompletComponent', () => {
  let component: TaskIncompletComponent;
  let fixture: ComponentFixture<TaskIncompletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskIncompletComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaskIncompletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
