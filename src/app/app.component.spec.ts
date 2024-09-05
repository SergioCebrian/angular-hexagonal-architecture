import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { GetTasks } from '@task:application/get-tasks/get-tasks';
import { TaskStore } from '@task:infra/store/task-store';
import { ITask } from '@task:domain/models/task.model';
import { signal } from '@angular/core';
import { TaskRepository } from '@task:domain/repositories/task-repository';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let getTasksSpy: jasmine.SpyObj<GetTasks>;
  let taskStoreSpy: jasmine.SpyObj<TaskStore>;

  beforeEach(async () => {
    getTasksSpy = jasmine.createSpyObj('GetTasks', ['getTasks']);
    const storeSpy = jasmine.createSpyObj('TaskStore', [
      'setTasksAction',
      'loadTasksAction',
    ]);

    await TestBed.configureTestingModule({
      declarations: [],
      providers: [
        TaskRepository,
        { provide: GetTasks, useValue: getTasksSpy },
        { provide: TaskStore, useValue: storeSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    getTasksSpy = TestBed.inject(
      GetTasks
    ) as jasmine.SpyObj<GetTasks>;
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

    getTasksSpy.getTasks.and.returnValue(Promise.resolve(mockTasks));
    taskStoreSpy.loadTasksAction.and.returnValue(signal(mockTasks));

    await component.ngOnInit();

    expect(getTasksSpy.getTasks).toHaveBeenCalled();
    expect(taskStoreSpy.setTasksAction).toHaveBeenCalledWith(mockTasks);
    expect(taskStoreSpy.loadTasksAction).toHaveBeenCalled();
    expect(component.tasks()).toEqual(mockTasks);
  });
});
