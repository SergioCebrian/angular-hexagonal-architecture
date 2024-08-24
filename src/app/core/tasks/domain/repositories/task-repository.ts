import { ITask } from '@task:domain/models/task.model';

export abstract class TaskRepository {
    abstract getTasks(): Promise<ITask[]>;
    abstract getTask(id: string): Promise<ITask>;
    abstract saveTask(task: ITask): Promise<ITask>;
    abstract updateTask(task: ITask): Promise<ITask>;
    abstract deleteTask(id: string): Promise<void>;
}
