import { inject, Injectable } from '@angular/core';
import { ITask } from '@task:domain/models/task.model';
import { TaskService } from '@task:domain/services/task/task.service';

@Injectable({
  providedIn: 'root',
})
export class GetTasks {
  readonly #taskService = inject(TaskService);

  async getTasks(): Promise<ITask[]> {
    return await this.#taskService.getTasks();
  }
}
