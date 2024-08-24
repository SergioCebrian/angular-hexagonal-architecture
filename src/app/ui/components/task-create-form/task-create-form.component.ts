import { Component, inject, input, InputSignal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TaskStore } from '@task:application/store/task-store';
import { SaveTaskUseCase } from '@task:application/usecases/save-task-usecase/save-task-usecase';
import { ITask } from '@task:domain/models/task.model';

@Component({
  selector: 'app-task-create-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './task-create-form.component.html',
  styleUrl: './task-create-form.component.scss',
})
export class TaskCreateFormComponent {
  total: InputSignal<number> = input<number>(0);
  readonly #saveTaskUseCase = inject(SaveTaskUseCase);
  readonly #taskStore = inject(TaskStore);

  createTaskForm = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(30),
    ]),
  });

  async saveTask(): Promise<void> {
    if (this.createTaskForm.valid) {
      const newId = this.total() + 1;
      const newTask: ITask = {
        id: newId.toString(),
        title: this.createTaskForm.value.title as string,
        isCompleted: false,
      };
      const response: ITask = await this.#saveTaskUseCase.saveTask(newTask);
      if (response) {
        this.#taskStore.saveTaskAction(newTask);
      }
      this.createTaskForm.reset();
    }
  }
}
