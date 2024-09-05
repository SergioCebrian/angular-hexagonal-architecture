import { ITask } from '@task:domain/models/task.model';

export interface TaskRepository {
    getTasks(): Promise<ITask[]>;
    getTask(id: string): Promise<ITask>;
    createTask(task: ITask): Promise<ITask>;
    updateTask(task: ITask): Promise<ITask>;
    deleteTask(id: string): Promise<void>;
}
