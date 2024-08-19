import { Component, input, InputSignal, output, OutputEmitterRef } from '@angular/core';
import { ITask } from '@task:domain/models/task';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.scss'
})
export class TaskItemComponent {
  task: InputSignal<ITask> = input.required<ITask>();
  deleteEvent: OutputEmitterRef<string> = output<string>();
  updateEvent: OutputEmitterRef<ITask> = output<ITask>();

  deleteTask(): void {
    this.deleteEvent.emit(this.task().id);
  }

  onCheckboxChange(event: Event): void {
    const checkedStatus = (<HTMLInputElement>event.target).checked;
    this.task().isCompleted = checkedStatus;
    const task: ITask = { ...this.task(), isCompleted: checkedStatus };
    this.updateEvent.emit(task);
  }
}
