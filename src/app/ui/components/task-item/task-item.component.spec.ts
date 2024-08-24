import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { TaskItemComponent } from './task-item.component';
import { TaskStore } from '@task:application/store/task-store';
import { DeleteTaskUseCase } from '@task:application/usecases/delete-task-usecase/delete-task-usecase';
import { UpdateTaskUseCase } from '@task:application/usecases/update-task-usecase/update-task-usecase';
import { ITask } from '@task:domain/models/task.model';
import { By } from '@angular/platform-browser';

describe('TaskItemComponent', () => {
  const mockTask: ITask = {
    id: '1',
    title: 'Test Task',
    isCompleted: false,
  };
  let component: TaskItemComponent;
  let debugElement: DebugElement;
  let fixture: ComponentFixture<TaskItemComponent>;

  beforeEach(async () => {
    const deleteTaskSpy = jasmine.createSpyObj('DeleteTaskUseCase', [
      'deleteTask',
    ]);
    const updateTaskSpy = jasmine.createSpyObj('UpdateTaskUseCase', [
      'updateTask',
    ]);
    const storeSpy = jasmine.createSpyObj('TaskStore', [
      'updateTaskAction',
      'deleteTaskAction',
    ]);

    await TestBed.configureTestingModule({
      declarations: [],
      providers: [
        { provide: DeleteTaskUseCase, useValue: deleteTaskSpy },
        { provide: UpdateTaskUseCase, useValue: updateTaskSpy },
        { provide: TaskStore, useValue: storeSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskItemComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.componentRef.setInput('task', mockTask);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('[Property: title] should display the correct task title in the template', () => {
    const taskNameElement = debugElement.query(By.css('.task-title'));
    expect(taskNameElement?.nativeElement.textContent).toContain(
      mockTask.title
    );
  });

  it('[onCheckboxChange] should update isCompleted property in task object when onCheckboxChange is called', () => {
    const event: Event = { target: { checked: true } } as unknown as Event;
    component.onCheckboxChange(event);
    expect(component.task().isCompleted).toBeTrue();
  });
});
