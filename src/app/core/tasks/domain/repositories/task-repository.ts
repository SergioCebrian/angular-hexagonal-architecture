import { ITask } from "@task:domain/models/task";
import { Observable } from "rxjs";

export abstract class TaskRepository {
    abstract getTasks(): Observable<ITask[]>;
    abstract getTask(id: string): Observable<ITask>;
    abstract addTask(task: ITask): Observable<ITask>;
    abstract updateTask(task: ITask): Observable<void>;
    abstract deleteTask(id: string): Observable<void>;
}
