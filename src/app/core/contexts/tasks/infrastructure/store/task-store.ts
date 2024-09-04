import { Injectable, signal, WritableSignal } from '@angular/core';
import { ITask } from '@task:domain/models/task.model';
import { ITaskStore } from './task-store.interface';

@Injectable({
  providedIn: 'root',
})
export class TaskStore implements ITaskStore {
  #tasks: WritableSignal<ITask[]> = signal<ITask[]>([]);

  deleteTaskAction(id: string): void {
    this.#tasks.update((tasks: ITask[]) =>
      tasks.filter((taskItem: ITask) => taskItem.id !== id)
    );
  }

  loadTasksAction(): WritableSignal<ITask[]> {
    return this.#tasks;
  }

  createTaskAction(task: ITask): void {
    this.#tasks.update((tasks: ITask[]) => [...tasks, task]);
  }

  setTasksAction(tasks: ITask[]): void {
    this.#tasks.set(tasks);
  }

  updateTaskAction(task: ITask): void {
    this.#tasks.update((tasks: ITask[]) =>
      tasks.map((taskItem: ITask) =>
        taskItem.id === task.id ? task : taskItem
      )
    );
  }
}