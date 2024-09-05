import { TestBed } from '@angular/core/testing';
import { TaskRepository } from '@task:domain/repositories/task-repository';
import { ITask } from '@task:domain/models/task.model';
import { GetTasks } from './get-tasks';

describe('GetTasks', () => {
  let getTasks: GetTasks;
  let taskRepositorySpy: jasmine.SpyObj<TaskRepository>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('TaskRepository', ['getTasks', 'getTask']);

    TestBed.configureTestingModule({
      providers: [GetTasks, { provide: TaskRepository, useValue: spy }],
    });

    getTasks = TestBed.inject(GetTasks);
    taskRepositorySpy = TestBed.inject(
      TaskRepository
    ) as jasmine.SpyObj<TaskRepository>;
  });

  it('should be created', () => {
    expect(getTasks).toBeTruthy();
  });

  it('[getTasks] should return expected tasks', async () => {
    const mockTasks: ITask[] = [
      { id: '1', title: 'Task 1', isCompleted: false },
      { id: '2', title: 'Task 2', isCompleted: true },
    ];

    taskRepositorySpy.getTasks.and.returnValue(Promise.resolve(mockTasks));

    const tasks = await getTasks.getTasks();
    expect(tasks).toEqual(mockTasks);
    expect(taskRepositorySpy.getTasks).toHaveBeenCalledTimes(1);
  });
});
