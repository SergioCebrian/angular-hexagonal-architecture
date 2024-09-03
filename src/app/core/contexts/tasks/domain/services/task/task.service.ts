import { inject, Injectable } from '@angular/core';
import { HttpService } from '@infra/http/http.service';
import { ITask } from '@task:domain/models/task.model';
import { TaskRepository } from '@task:domain/repositories/task-repository';

@Injectable({
  providedIn: 'root'
})
export class TaskService implements TaskRepository {

  readonly #apiUrl = 'tasks';
  #httpService = inject(HttpService);
  
  async getTasks(): Promise<ITask[]> {
    return await this.#httpService.getAll(this.#apiUrl);
  }

  async getTask(id: string): Promise<ITask> {
    const taskUrl = `${ this.#apiUrl }/${ id }`;
    return await this.#httpService.getOne(taskUrl); 
  }

  async createTask(task: ITask): Promise<ITask> {
    return await this.#httpService.create(this.#apiUrl, task); 
  }

  async updateTask(task: ITask): Promise<ITask> {
    const taskUrl = `${ this.#apiUrl }/${ task.id }`;
    return await this.#httpService.update(taskUrl, task);
  }

  async deleteTask(id: string): Promise<void> {
    const taskUrl = `${ this.#apiUrl }/${ id }`;
    return await this.#httpService.delete(taskUrl);
  }
}
