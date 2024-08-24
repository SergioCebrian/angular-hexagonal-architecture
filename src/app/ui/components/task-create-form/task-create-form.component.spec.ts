import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskCreateFormComponent } from './task-create-form.component';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { SaveTaskUseCase } from '@task:application/usecases/save-task-usecase/save-task-usecase';
import { TaskStore } from '@task:application/store/task-store';
import { ITask } from '@task:domain/models/task.model';

describe('TaskCreateFormComponent', () => {
  let component: TaskCreateFormComponent;
  let fixture: ComponentFixture<TaskCreateFormComponent>;
  let saveTaskUseCaseSpy: jasmine.SpyObj<SaveTaskUseCase>;
  let taskStoreSpy: jasmine.SpyObj<TaskStore>;

  beforeEach(async () => {
    const saveTaskSpy = jasmine.createSpyObj('SaveTaskUseCase', ['saveTask']);
    const storeSpy = jasmine.createSpyObj('TaskStore', ['saveTaskAction']);

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: SaveTaskUseCase, useValue: saveTaskSpy },
        { provide: TaskStore, useValue: storeSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskCreateFormComponent);
    component = fixture.componentInstance;
    saveTaskUseCaseSpy = TestBed.inject(
      SaveTaskUseCase
    ) as jasmine.SpyObj<SaveTaskUseCase>;
    taskStoreSpy = TestBed.inject(TaskStore) as jasmine.SpyObj<TaskStore>;

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

  it('[saveTask] should call saveTaskUseCase.saveTask and taskStore.saveTaskAction when form is valid', async () => {
    const newTask: ITask = {
      id: '1',
      title: 'New Task',
      isCompleted: false,
    };

    component.createTaskForm.setValue({ title: 'New Task' });
    fixture.componentRef.setInput('total', 0);

    saveTaskUseCaseSpy.saveTask.and.returnValue(Promise.resolve(newTask));

    await component.saveTask();

    expect(saveTaskUseCaseSpy.saveTask).toHaveBeenCalledWith({
      id: '1',
      title: 'New Task',
      isCompleted: false,
    });
    expect(taskStoreSpy.saveTaskAction).toHaveBeenCalledWith(newTask);
    expect(component.createTaskForm.value).toEqual({ title: null });
  });

  it('[saveTask] should not call saveTaskUseCase.saveTask or taskStore.saveTaskAction when form is invalid', async () => {
    component.createTaskForm.setValue({ title: '' }); // Invalid form

    await component.saveTask();

    expect(saveTaskUseCaseSpy.saveTask).not.toHaveBeenCalled();
    expect(taskStoreSpy.saveTaskAction).not.toHaveBeenCalled();
  });
});
