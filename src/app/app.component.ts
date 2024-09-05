import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { ITask } from '@task:domain/models/task.model';
import { TaskCreateFormComponent } from '@components/task-create-form/task-create-form.component';
import { TaskItemComponent } from '@components/task-item/task-item.component';
import { GetTasks } from '@task:application/usecases/get-tasks/get-tasks';
import { TaskStore } from '@task:infra/store/task-store';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    TaskCreateFormComponent,
    TaskItemComponent,
    AsyncPipe,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  tasks: WritableSignal<ITask[]> = signal<ITask[]>([]);
  readonly #getTasks = inject(GetTasks);
  readonly #taskStore = inject(TaskStore);

  async ngOnInit(): Promise<void> {
    this.#taskStore.setTasksAction(await this.#loadTasks());
    this.tasks = this.#taskStore.loadTasksAction();
  }

  async #loadTasks(): Promise<ITask[]> {
    return await this.#getTasks.getTasks();
  }
}
