import { TestBed } from '@angular/core/testing';
import { TaskService } from '@task:application/services/task/task.service';
import { ITask } from '@task:domain/models/task.model';
import { GetTasks } from './get-tasks';

describe('GetTasks', () => {
  let getTasks: GetTasks;
  let taskServiceSpy: jasmine.SpyObj<TaskService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('TaskService', ['getTasks', 'getTask']);

    TestBed.configureTestingModule({
      providers: [GetTasks, { provide: TaskService, useValue: spy }],
    });

    getTasks = TestBed.inject(GetTasks);
    taskServiceSpy = TestBed.inject(
      TaskService
    ) as jasmine.SpyObj<TaskService>;
  });

  it('should be created', () => {
    expect(getTasks).toBeTruthy();
  });

  it('[getTasks] should return expected tasks', async () => {
    const mockTasks: ITask[] = [
      { id: '1', title: 'Task 1', isCompleted: false },
      { id: '2', title: 'Task 2', isCompleted: true },
    ];

    taskServiceSpy.getTasks.and.returnValue(Promise.resolve(mockTasks));

    const tasks = await getTasks.getTasks();
    expect(tasks).toEqual(mockTasks);
    expect(taskServiceSpy.getTasks).toHaveBeenCalledTimes(1);
  });
});
