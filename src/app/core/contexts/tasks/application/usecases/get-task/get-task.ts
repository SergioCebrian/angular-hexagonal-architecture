import { inject, Injectable } from '@angular/core';
import { ITask } from '@task:domain/models/task.model';
import { TaskService } from '@task:application/services/task/task.service';

@Injectable({
  providedIn: 'root',
})
export class GetTask {
  readonly #taskService = inject(TaskService);

  async getTask(id: string): Promise<ITask> {
    return await this.#taskService.getTask(id);
  }
}
