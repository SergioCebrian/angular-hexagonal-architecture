import { Signal, WritableSignal } from '@angular/core';
import { ITask } from '@task:domain/models/task.model';

export interface TaskRepository {
    getTasks(): Promise<ITask[]> | WritableSignal<ITask[]>;
    getTask(id: string): Promise<ITask> | Signal<ITask | undefined>;
    createTask(task: ITask): Promise<ITask> | void;
    updateTask(task: ITask): Promise<ITask> | void;
    deleteTask(id: string): Promise<void> | void;
}
