import { TestBed } from '@angular/core/testing';
import { TaskRepository } from '@task:domain/repositories/task-repository';
import { ITask } from '@task:domain/models/task.model';
import { GetTasksUseCase } from './get-tasks-usecase';

describe('GetTasksUseCase', () => {
  let getTasksUseCase: GetTasksUseCase;
  let taskRepositorySpy: jasmine.SpyObj<TaskRepository>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('TaskRepository', ['getTasks', 'getTask']);

    TestBed.configureTestingModule({
      providers: [GetTasksUseCase, { provide: TaskRepository, useValue: spy }],
    });

    getTasksUseCase = TestBed.inject(GetTasksUseCase);
    taskRepositorySpy = TestBed.inject(
      TaskRepository
    ) as jasmine.SpyObj<TaskRepository>;
  });

  it('should be created', () => {
    expect(getTasksUseCase).toBeTruthy();
  });

  it('[getTasks] should return expected tasks', async () => {
    const mockTasks: ITask[] = [
      { id: '1', title: 'Task 1', isCompleted: false },
      { id: '2', title: 'Task 2', isCompleted: true },
    ];

    taskRepositorySpy.getTasks.and.returnValue(Promise.resolve(mockTasks));

    const tasks = await getTasksUseCase.getTasks();
    expect(tasks).toEqual(mockTasks);
    expect(taskRepositorySpy.getTasks).toHaveBeenCalledTimes(1);
  });

  it('[getTask] should return an expected task', async () => {
    const mockTask: ITask = { id: '1', title: 'Task 1', isCompleted: false };

    taskRepositorySpy.getTask.and.returnValue(Promise.resolve(mockTask));

    const task = await getTasksUseCase.getTask('1');
    expect(task).toEqual(mockTask);
    expect(taskRepositorySpy.getTask).toHaveBeenCalledTimes(1);
    expect(taskRepositorySpy.getTask).toHaveBeenCalledWith('1');
  });
});
