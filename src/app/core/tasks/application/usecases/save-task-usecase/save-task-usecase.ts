import { inject, Injectable } from "@angular/core";
import { ITask } from "@task:domain/models/task";
import { TaskRepository } from "@task:domain/repositories/task-repository";

@Injectable({
    providedIn: 'root'
})
export class SaveTaskUseCase {
    readonly #taskRepository = inject(TaskRepository);

    async saveTask(task: ITask): Promise<ITask> {
        return await this.#taskRepository.addTask(task); 
    }
}
