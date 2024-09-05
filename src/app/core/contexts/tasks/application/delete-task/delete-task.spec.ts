import { TestBed } from '@angular/core/testing';
import { TaskService } from '@task:domain/services/task/task.service';
import { DeleteTask } from './delete-task';

describe('DeleteTask', () => {
  let deleteTask: DeleteTask;
  let taskServiceSpy: jasmine.SpyObj<TaskService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('TaskService', ['deleteTask']);

    TestBed.configureTestingModule({
      providers: [
        DeleteTask,
        { provide: TaskService, useValue: spy },
      ],
    });

    deleteTask = TestBed.inject(DeleteTask);
    taskServiceSpy = TestBed.inject(
      TaskService
    ) as jasmine.SpyObj<TaskService>;
  });

  it('should be created', () => {
    expect(deleteTask).toBeTruthy();
  });

  it('[deleteTask] should delete a task and not return anything', async () => {
    const taskId = '1';
    taskServiceSpy.deleteTask.and.returnValue(Promise.resolve());
    await deleteTask.deleteTask(taskId);
    expect(taskServiceSpy.deleteTask).toHaveBeenCalledTimes(1);
    expect(taskServiceSpy.deleteTask).toHaveBeenCalledWith(taskId);
  });
});
