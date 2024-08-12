import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ITask } from '@task:domain/models/task';

@Component({
  selector: 'app-task-create-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './task-create-form.component.html',
  styleUrl: './task-create-form.component.scss'
})
export class TaskCreateFormComponent {
  @Input({ required: true }) total = 0;
  @Output() addEvent: EventEmitter<ITask> = new EventEmitter<ITask>();
  
  createTaskForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]),
  });

  addTask(): void {
    if (this.createTaskForm.valid) {
      const newId = (this.total + 1);
      const newTask: ITask = {
        id: newId.toString(),
        title: this.createTaskForm.value.title as string,
        isCompleted: false,
      };
      this.addEvent.emit(newTask); 
    }
  }
}
