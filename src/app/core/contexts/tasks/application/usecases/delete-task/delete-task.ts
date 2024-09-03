import { inject, Injectable } from '@angular/core';
import { TaskRepository } from '@task:domain/repositories/task-repository';

@Injectable({
  providedIn: 'root',
})
export class DeleteTask {
  readonly #taskRepository = inject(TaskRepository);

  async deleteTask(id: string): Promise<void> {
    return await this.#taskRepository.deleteTask(id);
  }
}
