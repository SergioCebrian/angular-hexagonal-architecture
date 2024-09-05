import { TestBed } from '@angular/core/testing';
import { TaskRepository } from '@task:domain/repositories/task-repository';
import { DeleteTask } from './delete-task';

describe('DeleteTask', () => {
  let deleteTask: DeleteTask;
  let taskRepositorySpy: jasmine.SpyObj<TaskRepository>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('TaskRepository', ['deleteTask']);

    TestBed.configureTestingModule({
      providers: [
        DeleteTask,
        { provide: TaskRepository, useValue: spy },
      ],
    });

    deleteTask = TestBed.inject(DeleteTask);
    taskRepositorySpy = TestBed.inject(
      TaskRepository
    ) as jasmine.SpyObj<TaskRepository>;
  });

  it('should be created', () => {
    expect(deleteTask).toBeTruthy();
  });

  it('[deleteTask] should delete a task and not return anything', async () => {
    const taskId = '1';
    taskRepositorySpy.deleteTask.and.returnValue(Promise.resolve());
    await deleteTask.deleteTask(taskId);
    expect(taskRepositorySpy.deleteTask).toHaveBeenCalledTimes(1);
    expect(taskRepositorySpy.deleteTask).toHaveBeenCalledWith(taskId);
  });
});
