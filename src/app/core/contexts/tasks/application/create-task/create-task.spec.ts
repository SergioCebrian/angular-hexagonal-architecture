import { TestBed } from '@angular/core/testing';
import { TaskRepository } from '@task:domain/repositories/task-repository';
import { ITask } from '@task:domain/models/task.model';
import { CreateTask } from './create-task';

describe('CreateTask', () => {
  let createTask: CreateTask;
  let taskRepositorySpy: jasmine.SpyObj<TaskRepository>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('TaskRepository', ['createTask']);

    TestBed.configureTestingModule({
      providers: [CreateTask, { provide: TaskRepository, useValue: spy }],
    });

    createTask = TestBed.inject(CreateTask);
    taskRepositorySpy = TestBed.inject(
      TaskRepository
    ) as jasmine.SpyObj<TaskRepository>;
  });

  it('should be created', () => {
    expect(createTask).toBeTruthy();
  });

  it('[createTask] should create a task and return the created task', async () => {
    const newTask: ITask = { id: '1', title: 'New Task', isCompleted: false };
    const createdTask: ITask = { ...newTask, isCompleted: true };

    taskRepositorySpy.createTask.and.returnValue(Promise.resolve(createdTask));

    const result = await createTask.createTask(newTask);
    expect(result).toEqual(createdTask);
    expect(taskRepositorySpy.createTask).toHaveBeenCalledTimes(1);
    expect(taskRepositorySpy.createTask).toHaveBeenCalledWith(newTask);
  });
});
