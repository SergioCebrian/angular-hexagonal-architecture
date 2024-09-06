import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { GetTasks } from '@task:application/usecases/get-tasks/get-tasks';
import { TaskStoreActions } from '@task:application/store/task-store-actions';
import { ITask } from '@task:domain/models/task.model';
import { signal } from '@angular/core';
import { TaskService } from '@task:application/services/task/task.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let getTasksSpy: jasmine.SpyObj<GetTasks>;
  let taskStoreSpy: jasmine.SpyObj<TaskStoreActions>;

  beforeEach(async () => {
    getTasksSpy = jasmine.createSpyObj('GetTasks', ['getTasks']);
    const storeSpy = jasmine.createSpyObj('TaskStoreActions', [
      'setTasks',
      'getTasks',
    ]);

    await TestBed.configureTestingModule({
      declarations: [],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        TaskService,
        { provide: GetTasks, useValue: getTasksSpy },
        { provide: TaskStoreActions, useValue: storeSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    getTasksSpy = TestBed.inject(
      GetTasks
    ) as jasmine.SpyObj<GetTasks>;
    taskStoreSpy = TestBed.inject(TaskStoreActions) as jasmine.SpyObj<TaskStoreActions>;
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
    taskStoreSpy.getTasks.and.returnValue(signal(mockTasks));

    await component.ngOnInit();

    expect(getTasksSpy.getTasks).toHaveBeenCalled();
    expect(taskStoreSpy.setTasks).toHaveBeenCalledWith(mockTasks);
    expect(taskStoreSpy.getTasks).toHaveBeenCalled();
    expect(component.tasks()).toEqual(mockTasks);
  });
});
