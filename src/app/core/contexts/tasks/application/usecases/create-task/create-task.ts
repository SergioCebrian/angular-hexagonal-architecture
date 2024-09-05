import { inject, Injectable } from '@angular/core';
import { TaskService } from '@task:application/services/task/task.service';
import { ITask } from '@task:domain/models/task.model';

@Injectable({
  providedIn: 'root',
})
export class CreateTask {
  readonly #taskService = inject(TaskService);

  async createTask(task: ITask): Promise<ITask> {
    return await this.#taskService.createTask(task);
  }
}
