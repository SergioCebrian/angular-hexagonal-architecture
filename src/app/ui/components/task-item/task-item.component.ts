import { Component, inject, input, InputSignal } from '@angular/core';
import { TaskStore } from '@task:infra/store/task-store';
import { DeleteTask } from '@task:application/usecases/delete-task/delete-task';
import { UpdateTask } from '@task:application/usecases/update-task/update-task';
import { ITask } from '@task:domain/models/task.model';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.scss',
})
export class TaskItemComponent {
  task: InputSignal<ITask> = input.required<ITask>();
  readonly #deleteTask = inject(DeleteTask);
  readonly #updateTask = inject(UpdateTask);
  readonly #taskStore = inject(TaskStore);

  #toggleCompletedStatus(event: Event): ITask {
    const checkedStatus = (<HTMLInputElement>event.target).checked;
    this.task().isCompleted = checkedStatus;
    const task: ITask = { ...this.task(), isCompleted: checkedStatus };
    return task;
  }

  async #doUpdateTask(task: ITask): Promise<void> {
    const response: unknown = await this.#updateTask.updateTask(task);
    if (response) {
      this.#taskStore.updateTaskAction(task);
    }
  }

  async doDeleteTask(): Promise<void> {
    const response: unknown = await this.#deleteTask.deleteTask(
      this.task().id
    );
    if (response) {
      this.#taskStore.deleteTaskAction(this.task().id);
    }
  }

  async onCheckboxChange(event: Event): Promise<void> {
    const task = this.#toggleCompletedStatus(event);
    await this.#doUpdateTask(task);
  }
}
