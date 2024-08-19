import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ITask } from '@task:domain/models/task';
import { of } from 'rxjs';
import { TaskService } from '@task:application/services/task/task.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let taskServiceSpy: jasmine.SpyObj<TaskService>;
  const mockTask: ITask = { id: '1', title: 'Task 1', isCompleted: false };

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('TaskService', ['getTasks', 'addTask', 'deleteTask', 'updateTask']);

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        TaskService,
        { provide: TaskService, useValue: spy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    taskServiceSpy = TestBed.inject(TaskService) as jasmine.SpyObj<TaskService>;
    taskServiceSpy.getTasks.and.returnValue(of([mockTask]));
    fixture.detectChanges();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('[ngOnInit] should initialize tasks$ in ngOnInit', () => {
    component.ngOnInit();
    component.tasks$.subscribe((tasks: ITask[]) => {
      expect(tasks).toEqual([mockTask]);
    });
  });

  it('[loadTasks] should load tasks', () => {
    const result = component['loadTasks']();
    result.subscribe((tasks: ITask[]) => {
      expect(tasks).toEqual([mockTask]);
    });
    expect(taskServiceSpy.getTasks).toHaveBeenCalledTimes(2);
  });

  it('[addTask] should add a task and update tasks$', () => {
    const newTask: ITask = { id: '2', title: 'New Task', isCompleted: false };
    taskServiceSpy.addTask.and.returnValue(of(newTask));

    component.tasks$ = of([mockTask]);
    component.addTask(newTask);
    component.tasks$.subscribe((tasks: ITask[]) => {
      expect(tasks).toContain(newTask);
      expect(tasks.length).toBe(2);
    });

    expect(taskServiceSpy.addTask).toHaveBeenCalledWith(newTask);
  });

  it('[deleteTask] should delete a task and update tasks$', () => {
    const taskId = mockTask.id;
    taskServiceSpy.deleteTask.and.returnValue(of(void 0));

    component.tasks$ = of([mockTask]);
    component.deleteTask(taskId);
    component.tasks$.subscribe((tasks: ITask[]) => {
      expect(tasks.some(task => task.id === taskId)).toBeFalse();
      expect(tasks.length).toBe(0);
    });

    expect(taskServiceSpy.deleteTask).toHaveBeenCalledWith(taskId);
  });

  it('[updateTask] should update a task and update tasks$', () => {
    const updatedTask: ITask = { id: '1', title: 'Updated Task', isCompleted: true };
    taskServiceSpy.updateTask.and.returnValue(of(void 0));

    component.tasks$ = of([mockTask]);
    component.updateTask(updatedTask);
    component.tasks$.subscribe((tasks: ITask[]) => {
      const filteredTask: ITask | undefined = tasks.find((task: ITask) => task.id === updatedTask.id);
      expect(filteredTask).toEqual(updatedTask);
      expect(filteredTask?.title).toBe('Updated Task');
      expect(filteredTask?.isCompleted).toBeTrue();
    });

    expect(taskServiceSpy.updateTask).toHaveBeenCalledWith(updatedTask);
  });
});
