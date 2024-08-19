import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { ITask } from '@task:domain/models/task';
import { TaskCreateFormComponent } from '@components/task-create-form/task-create-form.component';
import { TaskItemComponent } from '@components/task-item/task-item.component';
import { TaskService } from '@task:application/services/task/task.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TaskCreateFormComponent, TaskItemComponent, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  tasks: WritableSignal<ITask[]> = signal<ITask[]>([]);
  readonly #taskService = inject(TaskService);

  async ngOnInit(): Promise<void> {
    this.tasks.set(await this.#loadTasks());
  }

  async #loadTasks(): Promise<ITask[]> {
    return await this.#taskService.getTasks();
  }

  async addTask(task: ITask): Promise<void> {
    const response: ITask = await this.#taskService.addTask(task);
    if (response) {
      this.tasks.update((tasks: ITask[]) => [...tasks, task]);
    }
  }

  async deleteTask(id: string): Promise<void> {
    const response: unknown = await this.#taskService.deleteTask(id);
    if (response) {
      this.tasks.update((tasks: ITask[]) =>
        tasks.filter((taskItem: ITask) => taskItem.id !== id)
      );
    }
  }

  async updateTask(task: ITask): Promise<void> {
    const response: unknown = await this.#taskService.updateTask(task);
    if (response) {
      this.tasks.update((tasks: ITask[]) =>
        tasks.map((taskItem: ITask) => taskItem.id === task.id ? task : taskItem)
      );
    }
  }
}
