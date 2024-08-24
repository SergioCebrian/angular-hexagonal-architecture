import { inject, Injectable } from '@angular/core';
import { ITask } from '@task:domain/models/task.model';
import { TaskRepository } from '@task:domain/repositories/task-repository';

@Injectable({
  providedIn: 'root',
})
export class UpdateTaskUseCase {
  readonly #taskRepository = inject(TaskRepository);

  async updateTask(task: ITask): Promise<ITask> {
    return await this.#taskRepository.updateTask(task);
  }
}
