import { TestBed } from '@angular/core/testing';
import { TaskRepository } from '@task:domain/repositories/task-repository';
import { ITask } from '@task:domain/models/task.model';
import { SaveTaskUseCase } from './save-task-usecase';

describe('SaveTaskUseCase', () => {
  let saveTaskUseCase: SaveTaskUseCase;
  let taskRepositorySpy: jasmine.SpyObj<TaskRepository>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('TaskRepository', ['saveTask']);

    TestBed.configureTestingModule({
      providers: [SaveTaskUseCase, { provide: TaskRepository, useValue: spy }],
    });

    saveTaskUseCase = TestBed.inject(SaveTaskUseCase);
    taskRepositorySpy = TestBed.inject(
      TaskRepository
    ) as jasmine.SpyObj<TaskRepository>;
  });

  it('should be created', () => {
    expect(saveTaskUseCase).toBeTruthy();
  });

  it('[saveTask] should save a task and return the saved task', async () => {
    const newTask: ITask = { id: '1', title: 'New Task', isCompleted: false };
    const savedTask: ITask = { ...newTask, isCompleted: true };

    taskRepositorySpy.saveTask.and.returnValue(Promise.resolve(savedTask));

    const result = await saveTaskUseCase.saveTask(newTask);
    expect(result).toEqual(savedTask);
    expect(taskRepositorySpy.saveTask).toHaveBeenCalledTimes(1);
    expect(taskRepositorySpy.saveTask).toHaveBeenCalledWith(newTask);
  });
});
