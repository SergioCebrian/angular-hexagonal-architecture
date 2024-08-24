/* import { TestBed } from '@angular/core/testing';
import { TaskStore } from './task-store';
import { ITask } from '@task:domain/models/task.model';
import { signal } from '@angular/core';

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

  it('[setTasksAction] should set tasks correctly with setTasksAction', () => {
    const tasks: ITask[] = [
      { id: '1', title: 'Task 1', isCompleted: false },
      { id: '2', title: 'Task 2', isCompleted: true },
    ];

    store.setTasksAction(tasks);

    const result = store.loadTasksAction();
    expect(result).toEqual(signal(tasks));
  });

  it('[saveTaskAction] should add a task correctly with saveTaskAction', () => {
    const task: ITask = { id: '1', title: 'New Task', isCompleted: false };

    store.saveTaskAction(task);

    const result = store.loadTasksAction();
    expect(result).toEqual(signal([task]));
  });

  it('[updateTaskAction] should update a task correctly with updateTaskAction', () => {
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

    store.setTasksAction([initialTask]);
    store.updateTaskAction(updatedTask);

    const result = store.loadTasksAction();
    expect(result).toEqual(signal([updatedTask]));
  });

  it('[deleteTaskAction] should delete a task correctly with deleteTaskAction', () => {
    const task1: ITask = { id: '1', title: 'Task 1', isCompleted: false };
    const task2: ITask = { id: '2', title: 'Task 2', isCompleted: true };

    store.setTasksAction([task1, task2]);
    store.deleteTaskAction('1');

    const result = store.loadTasksAction();
    expect(result).toEqual(signal([task2]));
  });

  it('[loadTasksAction] should return the correct tasks with loadTasksAction', () => {
    const tasks: ITask[] = [
      { id: '1', title: 'Task 1', isCompleted: false },
      { id: '2', title: 'Task 2', isCompleted: true },
    ];

    store.setTasksAction(tasks);

    const result = store.loadTasksAction();
    expect(result).toEqual(signal(tasks));
  });
});
 */