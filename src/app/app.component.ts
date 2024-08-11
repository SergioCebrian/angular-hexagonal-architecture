import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { map, Observable } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ITask } from '@task:domain/models/task';
import { TaskCreateFormComponent } from '@components/task-create-form/task-create-form.component';
import { TaskItemComponent } from '@components/task-item/task-item.component';
import { TaskRepository } from '@task:domain/repositories/task-repository';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TaskCreateFormComponent, TaskItemComponent, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  tasks$!: Observable<ITask[]>;
  readonly #destroy: DestroyRef = inject(DestroyRef);
  readonly #taskRepository = inject(TaskRepository);

  ngOnInit(): void {
    this.tasks$ = this.loadTasks();
  }

  private loadTasks(): Observable<ITask[]> {
    return this.#taskRepository.getTasks();
  }

  addTask(task: ITask): void {
    this.#taskRepository.addTask(task)
      .pipe(takeUntilDestroyed(this.#destroy))
      .subscribe(() => {
        this.tasks$ = this.tasks$.pipe(
          map((tasks: ITask[]) => {
            return tasks.some((taskItem: ITask) => taskItem.id === task.id) 
              ? tasks 
              : [...tasks, task];
          })
        );
      });
  }

  deleteTask(id: string): void {
    this.#taskRepository.deleteTask(id)
      .pipe(takeUntilDestroyed(this.#destroy))
      .subscribe(() => {
        this.tasks$ = this.tasks$.pipe(
          map((tasks: ITask[]) => tasks.filter((taskItem: ITask) => taskItem.id !== id))
        );
      });
  }

  updateTask(task: ITask): void {
    this.#taskRepository.updateTask(task)
      .pipe(takeUntilDestroyed(this.#destroy))
      .subscribe(() => {
        this.tasks$ = this.tasks$.pipe(
          map((tasks: ITask[]) =>
            tasks.map((taskItem: ITask) =>
              taskItem.id === task.id ? task : taskItem
            )
          )
        );
      });
  }
}
