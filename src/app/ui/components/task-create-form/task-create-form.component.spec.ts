import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskCreateFormComponent } from './task-create-form.component';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { CreateTask } from '@task:application/usecases/create-task/create-task';
import { TaskStoreActions } from '@task:application/store/task-store-actions';
import { ITask } from '@task:domain/models/task.model';

describe('TaskCreateFormComponent', () => {
  let component: TaskCreateFormComponent;
  let fixture: ComponentFixture<TaskCreateFormComponent>;
  let createTaskSpy: jasmine.SpyObj<CreateTask>;
  let taskStoreSpy: jasmine.SpyObj<TaskStoreActions>;

  beforeEach(async () => {
    createTaskSpy = jasmine.createSpyObj('CreateTask', ['createTask']);
    const storeSpy = jasmine.createSpyObj('TaskStoreActions', ['createTask']);

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: CreateTask, useValue: createTaskSpy },
        { provide: TaskStoreActions, useValue: storeSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskCreateFormComponent);
    component = fixture.componentInstance;
    createTaskSpy = TestBed.inject(CreateTask) as jasmine.SpyObj<CreateTask>;
    taskStoreSpy = TestBed.inject(TaskStoreActions) as jasmine.SpyObj<TaskStoreActions>;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('[Form: title] should have a form with title control', () => {
    expect(component.createTaskForm.contains('title')).toBeTrue();
  });

  it('[Form: validate] should require title to be valid', () => {
    const titleControl: AbstractControl<string | null, string | null> | null =
      component.createTaskForm.get('title');
    titleControl?.setValue('A');
    expect(titleControl?.valid).toBeFalse();
    titleControl?.setValue('Valid Title');
    expect(titleControl?.valid).toBeTrue();
  });

  it('[createTask] should call createTask.createTask and taskStore.createTask when form is valid', async () => {
    const id = '5f4058d7-006e-4cee-895d-49ec658a20d6';
    spyOn(crypto, 'randomUUID').and.returnValue(id); // Fix UUID

    const newTask: ITask = {
      id,
      title: 'New Task',
      isCompleted: false,
    };

    component.createTaskForm.setValue({ title: 'New Task' });
    createTaskSpy.createTask.and.returnValue(Promise.resolve(newTask));

    await component.createTask();

    expect(createTaskSpy.createTask).toHaveBeenCalledWith(newTask);
    expect(taskStoreSpy.createTask).toHaveBeenCalledWith(newTask);
    expect(component.createTaskForm.value).toEqual({ title: null });
  });

  it('[createTask] should not call createTask.createTask or taskStore.createTask when form is invalid', async () => {
    component.createTaskForm.setValue({ title: '' }); // Invalid form

    await component.createTask();

    expect(createTaskSpy.createTask).not.toHaveBeenCalled();
    expect(taskStoreSpy.createTask).not.toHaveBeenCalled();
  });
});
