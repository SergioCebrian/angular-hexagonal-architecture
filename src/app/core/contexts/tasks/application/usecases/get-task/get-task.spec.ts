import { TestBed } from '@angular/core/testing';
import { TaskService } from '@task:application/services/task/task.service';
import { ITask } from '@task:domain/models/task.model';
import { GetTask } from './get-task';

describe('GetTask', () => {
  let getTask: GetTask;
  let taskServiceSpy: jasmine.SpyObj<TaskService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('TaskService', ['getTask']);

    TestBed.configureTestingModule({
      providers: [GetTask, { provide: TaskService, useValue: spy }],
    });

    getTask = TestBed.inject(GetTask);
    taskServiceSpy = TestBed.inject(
      TaskService
    ) as jasmine.SpyObj<TaskService>;
  });

  it('should be created', () => {
    expect(getTask).toBeTruthy();
  });

  it('[getTask] should return an expected task', async () => {
    const mockTask: ITask = { id: '1', title: 'Task 1', isCompleted: false };

    taskServiceSpy.getTask.and.returnValue(Promise.resolve(mockTask));

    const task = await getTask.getTask('1');
    expect(task).toEqual(mockTask);
    expect(taskServiceSpy.getTask).toHaveBeenCalledTimes(1);
    expect(taskServiceSpy.getTask).toHaveBeenCalledWith('1');
  });
});
