import { TestBed } from '@angular/core/testing';
import { TaskRepository } from '@task:domain/repositories/task-repository';
import { ITask } from '@task:domain/models/task.model';
import { GetTasks } from './get-task';

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

  it('[getTask] should return an expected task', async () => {
    const mockTask: ITask = { id: '1', title: 'Task 1', isCompleted: false };

    taskRepositorySpy.getTask.and.returnValue(Promise.resolve(mockTask));

    const task = await getTasks.getTask('1');
    expect(task).toEqual(mockTask);
    expect(taskRepositorySpy.getTask).toHaveBeenCalledTimes(1);
    expect(taskRepositorySpy.getTask).toHaveBeenCalledWith('1');
  });
});
