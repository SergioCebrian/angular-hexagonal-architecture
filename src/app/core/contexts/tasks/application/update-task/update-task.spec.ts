import { TestBed } from '@angular/core/testing';
import { TaskService } from '@task:domain/services/task/task.service';
import { ITask } from '@task:domain/models/task.model';
import { UpdateTask } from './update-task';

describe('UpdateTask', () => {
  let updateTask: UpdateTask;
  let taskServiceSpy: jasmine.SpyObj<TaskService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('TaskService', ['updateTask']);

    TestBed.configureTestingModule({
      providers: [
        UpdateTask,
        { provide: TaskService, useValue: spy },
      ],
    });

    updateTask = TestBed.inject(UpdateTask);
    taskServiceSpy = TestBed.inject(
      TaskService
    ) as jasmine.SpyObj<TaskService>;
  });

  it('should be created', () => {
    expect(updateTask).toBeTruthy();
  });

  it('[updateTask] should update a task and return the updated task', async () => {
    const taskToUpdate: ITask = {
      id: '1',
      title: 'Task to Update',
      isCompleted: false,
    };
    const updatedTask: ITask = { ...taskToUpdate, isCompleted: true };

    taskServiceSpy.updateTask.and.returnValue(Promise.resolve(updatedTask));

    const result = await updateTask.updateTask(taskToUpdate);
    expect(result).toEqual(updatedTask);
    expect(taskServiceSpy.updateTask).toHaveBeenCalledTimes(1);
    expect(taskServiceSpy.updateTask).toHaveBeenCalledWith(taskToUpdate);
  });
});
