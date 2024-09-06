import { inject, Injectable, Signal, WritableSignal } from '@angular/core';
import { ITask } from '@task:domain/models/task.model';
import { TaskRepository } from '@task:domain/repositories/task-repository';
import { TaskStore } from '@task:infra/store/task-store';

@Injectable({
    providedIn: 'root'
})
export class TaskStoreActions implements TaskRepository {
  #taskStore = inject(TaskStore);

  deleteTask(id: string): void {
    return this.#taskStore.deleteTask(id);
  }

  getTasks(): WritableSignal<ITask[]> {
    return this.#taskStore.getTasks();
  }

  getTask(id: string): Signal<ITask | undefined> {
    return this.#taskStore.getTask(id);
  }

  createTask(task: ITask): void {
    return this.#taskStore.createTask(task);
  }

  setTasks(tasks: ITask[]): void {
    return this.#taskStore.setTasks(tasks);
  }

  updateTask(task: ITask): void {
    return this.#taskStore.updateTask(task);
  }
}
