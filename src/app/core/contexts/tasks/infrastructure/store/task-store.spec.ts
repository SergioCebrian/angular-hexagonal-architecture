import { TestBed } from '@angular/core/testing';
import { TaskStore } from './task-store';
import { ITask } from '@task:domain/models/task.model';
import { WritableSignal } from '@angular/core';

describe('TaskStore', () => {
  let store: TaskStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TaskStore],
    });

    store = TestBed.inject(TaskStore);
  });

  it('should be created', () => {
    expect(store).toBeTruthy();
  });

  it('[setTasks] should set tasks correctly with setTasks', () => {
    const mockTasks: ITask[] = [
      { id: '1', title: 'Task 1', isCompleted: false },
      { id: '2', title: 'Task 2', isCompleted: true },
    ];
    store.setTasks(mockTasks);

    const result: WritableSignal<ITask[]> = store.getTasks();
    expect(result()).toEqual(mockTasks);
  });

  it('[createTask] should add a task correctly with createTask', () => {
    const mockTasks: ITask = { id: '1', title: 'New Task', isCompleted: false };
    store.createTask(mockTasks);

    const result: WritableSignal<ITask[]> = store.getTasks();
    expect(result()).toEqual([mockTasks]);
  });

  it('[updateTask] should update a task correctly with updateTask', () => {
    const initialTask: ITask = {
      id: '1',
      title: 'Initial Task',
      isCompleted: false,
    };
    const updatedTask: ITask = {
      id: '1',
      title: 'Updated Task',
      isCompleted: true,
    };

    store.setTasks([initialTask]);
    store.updateTask(updatedTask);

    const result: WritableSignal<ITask[]> = store.getTasks();
    expect(result()).toEqual([updatedTask]);
  });

  it('[deleteTask] should delete a task correctly with deleteTask', () => {
    const task1: ITask = { id: '1', title: 'Task 1', isCompleted: false };
    const task2: ITask = { id: '2', title: 'Task 2', isCompleted: true };

    store.setTasks([task1, task2]);
    store.deleteTask('1');

    const result: WritableSignal<ITask[]> = store.getTasks();
    expect(result()).toEqual([task2]);
  });

  it('[getTasks] should return the correct tasks with getTasks', () => {
    const mockTasks: ITask[] = [
      { id: '1', title: 'Task 1', isCompleted: false },
      { id: '2', title: 'Task 2', isCompleted: true },
    ];
    store.setTasks(mockTasks);

    const result: WritableSignal<ITask[]> = store.getTasks();
    expect(result()).toEqual(mockTasks);
  });

  it('[getTask] should return the correct task by id with getTask', () => {
    const mockTask1: ITask = { id: '1', title: 'Task 1', isCompleted: false };
    const mockTask2: ITask = { id: '2', title: 'Task 2', isCompleted: false };
  
    store.setTasks([mockTask1, mockTask2]);
  
    const result = store.getTask('1')();
    expect(result).toEqual(mockTask1);
    
    const result2 = store.getTask('2')();
    expect(result2).toEqual(mockTask2);
    
    const result3 = store.getTask('3')();
    expect(result3).toBeUndefined();
  });
});
