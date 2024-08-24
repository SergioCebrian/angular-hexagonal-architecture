import { TestBed } from '@angular/core/testing';
import { TaskRepository } from '@task:domain/repositories/task-repository';
import { ITask } from '@task:domain/models/task.model';
import { UpdateTaskUseCase } from './update-task-usecase';

describe('UpdateTaskUseCase', () => {
  let updateTaskUseCase: UpdateTaskUseCase;
  let taskRepositorySpy: jasmine.SpyObj<TaskRepository>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('TaskRepository', ['updateTask']);

    TestBed.configureTestingModule({
      providers: [
        UpdateTaskUseCase,
        { provide: TaskRepository, useValue: spy },
      ],
    });

    updateTaskUseCase = TestBed.inject(UpdateTaskUseCase);
    taskRepositorySpy = TestBed.inject(
      TaskRepository
    ) as jasmine.SpyObj<TaskRepository>;
  });

  it('should be created', () => {
    expect(updateTaskUseCase).toBeTruthy();
  });

  it('[updateTask] should update a task and return the updated task', async () => {
    const taskToUpdate: ITask = {
      id: '1',
      title: 'Task to Update',
      isCompleted: false,
    };
    const updatedTask: ITask = { ...taskToUpdate, isCompleted: true };

    taskRepositorySpy.updateTask.and.returnValue(Promise.resolve(updatedTask));

    const result = await updateTaskUseCase.updateTask(taskToUpdate);
    expect(result).toEqual(updatedTask);
    expect(taskRepositorySpy.updateTask).toHaveBeenCalledTimes(1);
    expect(taskRepositorySpy.updateTask).toHaveBeenCalledWith(taskToUpdate);
  });
});
