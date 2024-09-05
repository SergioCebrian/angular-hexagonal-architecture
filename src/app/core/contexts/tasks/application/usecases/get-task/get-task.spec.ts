import { TestBed } from '@angular/core/testing';
import { TaskService } from '@task:application/services/task/task.service';
import { ITask } from '@task:domain/models/task.model';
import { GetTasks } from './get-task';

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

  it('[getTask] should return an expected task', async () => {
    const mockTask: ITask = { id: '1', title: 'Task 1', isCompleted: false };

    taskServiceSpy.getTask.and.returnValue(Promise.resolve(mockTask));

    const task = await getTasks.getTask('1');
    expect(task).toEqual(mockTask);
    expect(taskServiceSpy.getTask).toHaveBeenCalledTimes(1);
    expect(taskServiceSpy.getTask).toHaveBeenCalledWith('1');
  });
});
