import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskCreateFormComponent } from './task-create-form.component';
import { ITask } from '@task:domain/models/task';

describe('TaskCreateFormComponent', () => {
  let component: TaskCreateFormComponent;
  let fixture: ComponentFixture<TaskCreateFormComponent>;
  const mockTask: ITask = { id: '1', title: 'Task 1', isCompleted: false };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskCreateFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaskCreateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('[Form: title] should create the form with a title control', () => {
    expect(component.createTaskForm.contains('title')).toBeTrue();
  });

  it('[Form: validation] should validate the title control', () => {
    const control = component.createTaskForm.get('title');
    control?.setValue('');
    expect(control?.valid).toBeFalse();

    control?.setValue('abc');
    expect(control?.valid).toBeFalse();

    control?.setValue('A valid task title');
    expect(control?.valid).toBeTrue();

    control?.setValue('A'.repeat(31));
    expect(control?.valid).toBeFalse(); 
  });

  it('[addEvent: valid] should emit addEvent with the new task when addTask is called and the form is valid', async() => {
    spyOn(component.addEvent, 'emit');

    fixture.componentRef.setInput('total', [0]);
    component.createTaskForm.get('title')?.setValue('Task 1');
    component.addTask();

    expect(component.addEvent.emit).toHaveBeenCalledWith(mockTask);
  });

  it('[addEvent: invalid] should not emit addEvent if the form is invalid', () => {
    spyOn(component.addEvent, 'emit');

    component.createTaskForm.get('title')?.setValue('');
    component.addTask();

    expect(component.addEvent.emit).not.toHaveBeenCalled();
  });
});
