import { computed, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { ITask } from '@task:domain/models/task.model';
import { TaskRepository } from '@task:domain/repositories/task-repository';

@Injectable({
  providedIn: 'root',
})
export class TaskStore implements TaskRepository {
  #tasks: WritableSignal<ITask[]> = signal<ITask[]>([]);

  deleteTask(id: string): void {
    this.#tasks.update((tasks: ITask[]) =>
      tasks.filter((taskItem: ITask) => taskItem.id !== id)
    );
  }

  getTasks(): WritableSignal<ITask[]> {
    return this.#tasks;
  }

  getTask(id: string): Signal<ITask | undefined> {
    return computed(() => {
      return this.#tasks().find((task: ITask) => task.id === id);
    });
  }

  createTask(task: ITask): void {
    this.#tasks.update((tasks: ITask[]) => [...tasks, task]);
  }

  setTasks(tasks: ITask[]): void {
    this.#tasks.set(tasks);
  }

  updateTask(task: ITask): void {
    this.#tasks.update((tasks: ITask[]) =>
      tasks.map((taskItem: ITask) =>
        taskItem.id === task.id ? task : taskItem
      )
    );
  }
}