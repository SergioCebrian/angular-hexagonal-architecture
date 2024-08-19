import { inject, Injectable } from '@angular/core';
import { HttpService } from '@infra/http/http.service';
import { ITask } from '@task:domain/models/task';
import { TaskRepository } from '@task:domain/repositories/task-repository';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService implements TaskRepository {

  readonly #apiUrl = 'tasks';
  #httpService = inject(HttpService);
  
  getTasks(): Observable<ITask[]> {
    return this.#httpService.getAll(this.#apiUrl);
  }

  getTask(id: string): Observable<ITask> {
    const taskUrl = `${ this.#apiUrl }/${ id }`;
    return this.#httpService.getOne(taskUrl); 
  }

  addTask(task: ITask): Observable<ITask> {
    return this.#httpService.create(this.#apiUrl, task); 
  }

  updateTask(task: ITask): Observable<void> {
    const taskUrl = `${ this.#apiUrl }/${ task.id }`;
    return this.#httpService.update(taskUrl, task);
  }

  deleteTask(id: string): Observable<void> {
    const taskUrl = `${ this.#apiUrl }/${ id }`;
    return this.#httpService.delete(taskUrl);
  }
}
