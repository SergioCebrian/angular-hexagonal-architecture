import { inject, Injectable } from '@angular/core';
import { TaskService } from '@task:domain/services/task/task.service';

@Injectable({
  providedIn: 'root',
})
export class DeleteTask {
  readonly #taskService = inject(TaskService);

  async deleteTask(id: string): Promise<void> {
    return await this.#taskService.deleteTask(id);
  }
}
