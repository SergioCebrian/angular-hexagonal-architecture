import { TestBed } from '@angular/core/testing';
import { TaskRepository } from '@task:domain/repositories/task-repository';
import { DeleteTaskUseCase } from './delete-task-usecase';

describe('DeleteTaskUseCase', () => {
  let deleteTaskUseCase: DeleteTaskUseCase;
  let taskRepositorySpy: jasmine.SpyObj<TaskRepository>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('TaskRepository', ['deleteTask']);

    TestBed.configureTestingModule({
      providers: [
        DeleteTaskUseCase,
        { provide: TaskRepository, useValue: spy },
      ],
    });

    deleteTaskUseCase = TestBed.inject(DeleteTaskUseCase);
    taskRepositorySpy = TestBed.inject(
      TaskRepository
    ) as jasmine.SpyObj<TaskRepository>;
  });

  it('should be created', () => {
    expect(deleteTaskUseCase).toBeTruthy();
  });

  it('[deleteTask] should delete a task and not return anything', async () => {
    const taskId = '1';
    taskRepositorySpy.deleteTask.and.returnValue(Promise.resolve());
    await deleteTaskUseCase.deleteTask(taskId);
    expect(taskRepositorySpy.deleteTask).toHaveBeenCalledTimes(1);
    expect(taskRepositorySpy.deleteTask).toHaveBeenCalledWith(taskId);
  });
});
