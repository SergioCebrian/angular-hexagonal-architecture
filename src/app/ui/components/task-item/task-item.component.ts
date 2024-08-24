import { Component, inject, input, InputSignal } from '@angular/core';
import { TaskStore } from '@task:application/store/task-store';
import { DeleteTaskUseCase } from '@task:application/usecases/delete-task-usecase/delete-task-usecase';
import { UpdateTaskUseCase } from '@task:application/usecases/update-task-usecase/update-task-usecase';
import { ITask } from '@task:domain/models/task.model';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.scss'
})
export class TaskItemComponent {
  task: InputSignal<ITask> = input.required<ITask>();
  readonly #deleteTaskUseCase = inject(DeleteTaskUseCase);
  readonly #updateTaskUseCase = inject(UpdateTaskUseCase);
  readonly #taskStore = inject(TaskStore);

  #toggleCompletedStatus(event: Event): ITask {
    const checkedStatus = (<HTMLInputElement>event.target).checked;
    this.task().isCompleted = checkedStatus;
    const task: ITask = { ...this.task(), isCompleted: checkedStatus };
    return task;
  }

  async #updateTask(task: ITask): Promise<void> {
    const response: unknown = await this.#updateTaskUseCase.updateTask(task);
    if (response) {
      this.#taskStore.updateTaskAction(task);
    }
  }

  async deleteTask(): Promise<void> {
    const response: unknown = await this.#deleteTaskUseCase.deleteTask(this.task().id);
    if (response) {
      this.#taskStore.deleteTaskAction(this.task().id);
    }
  }

  async onCheckboxChange(event: Event): Promise<void> {
    const task = this.#toggleCompletedStatus(event);
    await this.#updateTask(task);
  }
}
