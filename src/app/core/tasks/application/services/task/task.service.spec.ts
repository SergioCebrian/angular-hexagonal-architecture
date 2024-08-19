import { TestBed } from '@angular/core/testing';

import { TaskService } from './task.service';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { HttpService } from '@infra/http/http.service';
import { ITask } from '@task:domain/models/task';

describe('TaskService', () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let httpTesting: HttpTestingController;
  let service: TaskService;
  let httpServiceSpy: jasmine.SpyObj<HttpService<unknown>>;
  const apiUrlMock = 'tasks';
  const mockTask: ITask = { id: '1', title: 'Task 1', isCompleted: false };

  beforeEach(() => {
    const spy = jasmine.createSpyObj('HttpService', ['getAll', 'getOne', 'create', 'update', 'delete']);
    
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: HttpService, useValue: spy },
      ]
    });

    service = TestBed.inject(TaskService);
    httpTesting = TestBed.inject(HttpTestingController);
    httpServiceSpy = TestBed.inject(HttpService) as jasmine.SpyObj<HttpService<unknown>>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('[getTasks] should return an array', async() => {
    httpServiceSpy.getAll.and.returnValue(Promise.resolve([mockTask]));
    const result: ITask[] = await service.getTasks();
    expect(result).toEqual([mockTask]);
    expect(httpServiceSpy.getAll).toHaveBeenCalledOnceWith(apiUrlMock);
  });

  it('[getTask] should return a task', async() => {
    httpServiceSpy.getOne.and.returnValue(Promise.resolve(mockTask));
    const result: ITask = await service.getTask('1');
    expect(result).toEqual(mockTask);
    expect(httpServiceSpy.getOne).toHaveBeenCalledWith(`${apiUrlMock}/1`);
  });

  it('[addTask] should return a new task', async() => {
    httpServiceSpy.create.and.returnValue(Promise.resolve(mockTask));
    const result: ITask = await service.addTask(mockTask);
    expect(result).toEqual(mockTask);
    expect(httpServiceSpy.create).toHaveBeenCalledWith(apiUrlMock, mockTask);
  });

  it('[updateTask] should update a task', async() => {
    httpServiceSpy.update.and.returnValue(Promise.resolve(mockTask));
    const result: void = await service.updateTask(mockTask);
    expect(result).toEqual(undefined);
    expect(httpServiceSpy.update).toHaveBeenCalledWith(`${apiUrlMock}/1`, mockTask);
  });

  it('[deleteTask] should delete a task', async() => {
    httpServiceSpy.delete.and.returnValue(Promise.resolve());
    const result: void = await service.deleteTask('1');
    expect(result).toEqual(undefined);
    expect(httpServiceSpy.delete).toHaveBeenCalledWith(`${apiUrlMock}/1`);
  });
});
