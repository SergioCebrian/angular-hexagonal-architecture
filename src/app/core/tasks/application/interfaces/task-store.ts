import { WritableSignal } from "@angular/core";
import { ITask } from "@task:domain/models/task";

export interface TaskStoreInterface {
    addTaskAction(task: ITask): void;
    deleteTaskAction(id: string): void;
    loadTasksAction(): WritableSignal<ITask[]>;
    saveTaskAction(task: ITask): void;
    setTasksAction(tasks: ITask[]): void;
    updateTaskAction(task: ITask): void;
}