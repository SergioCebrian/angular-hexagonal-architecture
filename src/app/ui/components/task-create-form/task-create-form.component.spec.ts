/* import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskCreateFormComponent } from './task-create-form.component';
//import { ITask } from '@task:domain/models/task.model';

describe('TaskCreateFormComponent', () => {
  let component: TaskCreateFormComponent;
  let fixture: ComponentFixture<TaskCreateFormComponent>;
  //const mockTask: ITask = { id: '1', title: 'Task 1', isCompleted: false };

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
});
 */