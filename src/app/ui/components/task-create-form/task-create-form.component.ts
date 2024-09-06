import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TaskStoreActions } from '@task:application/store/task-store-actions';
import { CreateTask } from '@task:application/usecases/create-task/create-task';
import { ITask } from '@task:domain/models/task.model';

@Component({
  selector: 'app-task-create-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './task-create-form.component.html',
  styleUrl: './task-create-form.component.scss',
})
export class TaskCreateFormComponent {
  readonly #createTask = inject(CreateTask);
  readonly #taskStore = inject(TaskStoreActions);

  createTaskForm = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(30),
    ]),
  });

  async createTask(): Promise<void> {
    if (this.createTaskForm.valid) {
      const newId = crypto.randomUUID();
      const newTask: ITask = {
        id: newId,
        title: this.createTaskForm.value.title as string,
        isCompleted: false,
      };
      const response: ITask = await this.#createTask.createTask(newTask);
      if (response) {
        this.#taskStore.createTask(newTask);
      }
      this.createTaskForm.reset();
    }
  }
}
