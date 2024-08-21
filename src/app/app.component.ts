import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { ITask } from '@task:domain/models/task';
import { TaskCreateFormComponent } from '@components/task-create-form/task-create-form.component';
import { TaskItemComponent } from '@components/task-item/task-item.component';
import { GetTasksUseCase } from '@task:application/usecases/get-tasks-usecase/get-tasks-usecase';
import { TaskStore } from '@task:application/store/task-store';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TaskCreateFormComponent, TaskItemComponent, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  tasks: WritableSignal<ITask[]> = signal<ITask[]>([]);
  readonly #getTasksUseCase = inject(GetTasksUseCase);
  readonly #taskStore = inject(TaskStore);

  async ngOnInit(): Promise<void> {
    this.#taskStore.setTasksAction(await this.#loadTasks());
    this.tasks = this.#taskStore.loadTasksAction();
  }

  async #loadTasks(): Promise<ITask[]> {
    return await this.#getTasksUseCase.getTasks();
  }
}
