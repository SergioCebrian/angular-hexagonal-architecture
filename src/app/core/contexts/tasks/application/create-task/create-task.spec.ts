import { TestBed } from '@angular/core/testing';
import { ITask } from '@task:domain/models/task.model';
import { CreateTask } from './create-task';
import { TaskService } from '@task:domain/services/task/task.service';

describe('CreateTask', () => {
  let createTask: CreateTask;
  let taskServiceSpy: jasmine.SpyObj<TaskService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('TaskService', ['createTask']);

    TestBed.configureTestingModule({
      providers: [CreateTask, { provide: TaskService, useValue: spy }],
    });

    createTask = TestBed.inject(CreateTask);
    taskServiceSpy = TestBed.inject(
      TaskService
    ) as jasmine.SpyObj<TaskService>;
  });

  it('should be created', () => {
    expect(createTask).toBeTruthy();
  });

  it('[createTask] should create a task and return the created task', async () => {
    const newTask: ITask = { id: '1', title: 'New Task', isCompleted: false };
    const createdTask: ITask = { ...newTask, isCompleted: true };

    taskServiceSpy.createTask.and.returnValue(Promise.resolve(createdTask));

    const result = await createTask.createTask(newTask);
    expect(result).toEqual(createdTask);
    expect(taskServiceSpy.createTask).toHaveBeenCalledTimes(1);
    expect(taskServiceSpy.createTask).toHaveBeenCalledWith(newTask);
  });
});
