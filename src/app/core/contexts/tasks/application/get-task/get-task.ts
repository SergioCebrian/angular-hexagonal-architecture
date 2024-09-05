import { inject, Injectable } from '@angular/core';
import { ITask } from '@task:domain/models/task.model';
import { TaskRepository } from '@task:domain/repositories/task-repository';

@Injectable({
  providedIn: 'root',
})
export class GetTasks {
  readonly #taskRepository = inject(TaskRepository);

  async getTask(id: string): Promise<ITask> {
    return await this.#taskRepository.getTask(id);
  }
}
