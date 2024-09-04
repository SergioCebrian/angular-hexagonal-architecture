import { WritableSignal } from "@angular/core";
import { ITask } from '@task:domain/models/task.model';

export interface ITaskStore {
    deleteTaskAction(id: string): void;
    loadTasksAction(): WritableSignal<ITask[]>;
    createTaskAction(task: ITask): void;
    setTasksAction(tasks: ITask[]): void;
    updateTaskAction(task: ITask): void;
}