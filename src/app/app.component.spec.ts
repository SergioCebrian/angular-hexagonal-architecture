import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { GetTasksUseCase } from '@task:application/usecases/get-tasks-usecase/get-tasks-usecase';
import { TaskStore } from '@task:application/store/task-store';
import { ITask } from '@task:domain/models/task.model';
import { signal } from '@angular/core';
import { TaskRepository } from '@task:domain/repositories/task-repository';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let getTasksUseCaseSpy: jasmine.SpyObj<GetTasksUseCase>;
  let taskStoreSpy: jasmine.SpyObj<TaskStore>;

  beforeEach(async () => {
    const getTasksSpy = jasmine.createSpyObj('GetTasksUseCase', ['getTasks']);
    const storeSpy = jasmine.createSpyObj('TaskStore', [
      'setTasksAction',
      'loadTasksAction',
    ]);

    await TestBed.configureTestingModule({
      declarations: [],
      providers: [
        TaskRepository,
        { provide: GetTasksUseCase, useValue: getTasksSpy },
        { provide: TaskStore, useValue: storeSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    getTasksUseCaseSpy = TestBed.inject(
      GetTasksUseCase
    ) as jasmine.SpyObj<GetTasksUseCase>;
    taskStoreSpy = TestBed.inject(TaskStore) as jasmine.SpyObj<TaskStore>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('[ngOnInit] should load tasks on ngOnInit', async () => {
    const mockTasks: ITask[] = [
      { id: '1', title: 'Task 1', isCompleted: false },
      { id: '2', title: 'Task 2', isCompleted: true },
    ];

    getTasksUseCaseSpy.getTasks.and.returnValue(Promise.resolve(mockTasks));
    taskStoreSpy.loadTasksAction.and.returnValue(signal(mockTasks));

    await component.ngOnInit();

    expect(getTasksUseCaseSpy.getTasks).toHaveBeenCalled();
    expect(taskStoreSpy.setTasksAction).toHaveBeenCalledWith(mockTasks);
    expect(taskStoreSpy.loadTasksAction).toHaveBeenCalled();
    expect(component.tasks()).toEqual(mockTasks);
  });
});
