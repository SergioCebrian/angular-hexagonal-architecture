import { ITask } from "@task:domain/models/task";

export abstract class TaskRepository {
    abstract getTasks(): Promise<ITask[]>;
    abstract getTask(id: string): Promise<ITask>;
    abstract addTask(task: ITask): Promise<ITask>;
    abstract updateTask(task: ITask): Promise<void>;
    abstract deleteTask(id: string): Promise<void>;
}
