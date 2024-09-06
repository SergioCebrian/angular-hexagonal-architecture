import { TestBed } from '@angular/core/testing';
import { TaskStore } from '@task:infra/store/task-store';
import { ITask } from '@task:domain/models/task.model';
import { Signal, WritableSignal } from '@angular/core';
import { TaskStoreActions } from './task-store-actions';

describe('TaskStoreActions', () => {
  let service: TaskStoreActions;
  let taskStore: jasmine.SpyObj<TaskStore>;

  beforeEach(() => {
    const taskStoreSpy = jasmine.createSpyObj('TaskStore', [
      'deleteTask',
      'getTasks',
      'getTask',
      'createTask',
      'setTasks',
      'updateTask',
    ]);

    TestBed.configureTestingModule({
      providers: [
        TaskStoreActions,
        { provide: TaskStore, useValue: taskStoreSpy },
      ],
    });

    service = TestBed.inject(TaskStoreActions);
    taskStore = TestBed.inject(TaskStore) as jasmine.SpyObj<TaskStore>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('[deleteTask] should call deleteTask on TaskStore', () => {
    const id = '1';
    service.deleteTask(id);
    expect(taskStore.deleteTask).toHaveBeenCalledWith(id);
  });

  it('[getTasks] should call getTasks on TaskStore', () => {
    const mockTasksSignal = {} as WritableSignal<ITask[]>;
    taskStore.getTasks.and.returnValue(mockTasksSignal);

    const tasksSignal = service.getTasks();
    expect(taskStore.getTasks).toHaveBeenCalled();
    expect(tasksSignal).toBe(mockTasksSignal);
  });

  it('[getTask] should call getTask on TaskStore', () => {
    const id = '1';
    const mockTaskSignal = {} as Signal<ITask | undefined>;
    taskStore.getTask.and.returnValue(mockTaskSignal);

    const taskSignal = service.getTask(id);
    expect(taskStore.getTask).toHaveBeenCalledWith(id);
    expect(taskSignal).toBe(mockTaskSignal);
  });

  it('[createTask] should call createTask on TaskStore', () => {
    const mockTask: ITask = {
      id: '1',
      title: 'Title task',
      isCompleted: false,
    };

    service.createTask(mockTask);
    expect(taskStore.createTask).toHaveBeenCalledWith(mockTask);
  });

  it('[setTasks] should call setTasks on TaskStore', () => {
    const tasks: ITask[] = [
      { id: '1', title: 'Task 1', isCompleted: false },
      { id: '2', title: 'Task 2', isCompleted: false },
    ];

    service.setTasks(tasks);
    expect(taskStore.setTasks).toHaveBeenCalledWith(tasks);
  });

  it('[updateTask] should call updateTask on TaskStore', () => {
    const mockTask: ITask = {
      id: '1',
      title: 'Updated Task',
      isCompleted: false,
    };

    service.updateTask(mockTask);
    expect(taskStore.updateTask).toHaveBeenCalledWith(mockTask);
  });
});
