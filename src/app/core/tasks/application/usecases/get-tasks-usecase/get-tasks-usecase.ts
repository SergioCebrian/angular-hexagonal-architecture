import { inject, Injectable } from "@angular/core";
import { ITask } from "@task:domain/models/task";
import { TaskRepository } from "@task:domain/repositories/task-repository";

@Injectable({
  providedIn: 'root'
})
export class GetTasksUseCase {
    readonly #taskRepository = inject(TaskRepository);
  
    async getTasks(): Promise<ITask[]> {
      return await this.#taskRepository.getTasks();
    }

    async getTask(id: string): Promise<ITask> {
        return await this.#taskRepository.getTask(id); 
    }
}
