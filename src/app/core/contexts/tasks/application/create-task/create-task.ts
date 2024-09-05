import { inject, Injectable } from '@angular/core';
import { ITask } from '@task:domain/models/task.model';
import { TaskService } from '@task:domain/services/task/task.service';

@Injectable({
  providedIn: 'root',
})
export class CreateTask {
  readonly #taskService = inject(TaskService);

  async createTask(task: ITask): Promise<ITask> {
    return await this.#taskService.createTask(task);
  }
}
