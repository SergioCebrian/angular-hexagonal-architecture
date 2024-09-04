import { Injectable, signal, WritableSignal, inject } from '@angular/core';
import { ITask } from '@task:domain/models/task.model';
import { ITaskStore } from '@task:infra/store/task-store.interface';
import { StoreService } from '@infra/store/store.service';
import { IStore } from '@infra/store/store.interface';

@Injectable({
  providedIn: 'root',
})
export class TaskStore implements ITaskStore {
  #store: IStore<ITask> = inject(StoreService);
  #tasks: WritableSignal<ITask[]> = signal<ITask[]>([]);

  deleteTaskAction(id: string): void {
    return this.#store.deleteAction(this.#tasks, id);
  }

  loadTasksAction(): WritableSignal<ITask[]> {
    return this.#store.loadAction(this.#tasks);
  }

  createTaskAction(task: ITask): void {
    return this.#store.createAction(this.#tasks, task);
  }

  setTasksAction(tasks: ITask[]): void {
    return this.#store.setAction(this.#tasks, tasks);
  }

  updateTaskAction(task: ITask): void {
    return this.#store.updateAction(this.#tasks, task);
  }
}
