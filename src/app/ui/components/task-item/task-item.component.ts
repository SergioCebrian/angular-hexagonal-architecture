import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ITask } from '@task:domain/models/task';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.scss'
})
export class TaskItemComponent {
  @Input({ required: true }) task!: ITask;
  @Output() deleteEvent: EventEmitter<string> = new EventEmitter<string>();
  @Output() updateEvent: EventEmitter<ITask> = new EventEmitter<ITask>();

  deleteTask(): void {
    this.deleteEvent.emit(this.task?.id);
  }

  onCheckboxChange(event: Event): void {
    const checkedStatus = (<HTMLInputElement>event.target).checked;
    this.task.isCompleted = checkedStatus;
    const task: ITask = { ...this.task, isCompleted: checkedStatus };
    this.updateEvent.emit(task);
  }
}
