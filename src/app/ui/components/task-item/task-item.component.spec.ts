/* import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskItemComponent } from './task-item.component';
import { ITask } from '@task:domain/models/task.model';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('TaskItemComponent', () => {
  let component: TaskItemComponent;
  let debugElement: DebugElement;
  let fixture: ComponentFixture<TaskItemComponent>;
  const mockTask: ITask = { id: '1', title: 'Task 1', isCompleted: false };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaskItemComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.componentRef.setInput('task', mockTask);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('[onCheckboxChange] should update isCompleted property in task object when onCheckboxChange is called', () => {
    const event: Event = { target: { checked: true } } as unknown as Event;
    component.onCheckboxChange(event);
    expect(component.task().isCompleted).toBeTrue();
  });

  it('[Component: title] should display the correct task title in the template', () => {
    const taskNameElement = debugElement.query(By.css('.task-title'));
    expect(taskNameElement?.nativeElement.textContent).toContain(mockTask.title);
  });
});
 */