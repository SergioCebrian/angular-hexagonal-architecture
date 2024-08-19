import { TestBed } from '@angular/core/testing';

import { HttpService } from './http.service';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { environment } from '@env/environment';
import { ITask } from '@task:domain/models/task';

describe('HttpService', () => {
  let service: HttpService<unknown>;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let httpTesting: HttpTestingController;
  const apiUrl = environment.apiUrl;
  const apiUrlMock = 'tasks';
  const mockTask: ITask = { id: '1', title: 'Task 1', isCompleted: false };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting() 
      ]
    });
    httpTesting = TestBed.inject(HttpTestingController);
    service = TestBed.inject(HttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('[getAll] should return an array', async() => {
    const getAllTasks: Promise<unknown[]> = service.getAll(apiUrlMock);
    const req = httpTesting.expectOne(`${apiUrl}/${apiUrlMock}`, 'Request to load all tasks');

    expect(req.request.method).toBe('GET');
    req.flush([mockTask]);
    expect(await getAllTasks).toEqual([mockTask]);
    httpTesting.verify();
  });

  it('[getOne] should return an object', async() => {
    const getOneTask = service.getOne(`${apiUrlMock}/1`);
    const req = httpTesting.expectOne(`${apiUrl}/${apiUrlMock}/1`, 'Request a task');
    
    expect(req.request.method).toBe('GET');
    req.flush(mockTask);
    expect(await getOneTask).toEqual(mockTask);
    httpTesting.verify();
  });

  it('[create] should return a new object', async() => {
    const createTask = service.create(apiUrlMock, mockTask);
    const req = httpTesting.expectOne(`${apiUrl}/${apiUrlMock}`, 'Create a new task');
    
    expect(req.request.method).toBe('POST');
    req.flush(mockTask);
    expect(await createTask).toEqual(mockTask);
    httpTesting.verify();
  });

  it('[update] should update an object', async() => {
    const updateTask = service.update(`${apiUrlMock}/1`, mockTask);
    const req = httpTesting.expectOne(`${apiUrl}/${apiUrlMock}/1`, 'Update a task');
    
    expect(req.request.method).toBe('PUT');
    req.flush(mockTask);
    expect(await updateTask).toEqual(mockTask);
    httpTesting.verify();
  });

  it('[delete] should delete an object', async() => {
    const deleteTask = service.delete(`${apiUrlMock}/1`);
    const req = httpTesting.expectOne(`${apiUrl}/${apiUrlMock}/1`, 'Delete a task');
    
    expect(req.request.method).toBe('DELETE');
    req.flush(mockTask);
    expect(await deleteTask).toEqual(undefined);
    httpTesting.verify();
  });
});
