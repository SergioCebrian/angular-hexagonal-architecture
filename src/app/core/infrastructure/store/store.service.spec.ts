import { TestBed } from '@angular/core/testing';
import { StoreService } from './store.service';
import { signal, WritableSignal } from '@angular/core';

interface IItemMock {
  id: string;
  title: string;
  isCompleted: boolean;
}

describe('StoreService', () => {
  let service: StoreService<IItemMock>;
  const items: WritableSignal<IItemMock[]> = signal<IItemMock[]>([]);

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
  it('[setAction] should set items correctly with setAction', () => {
    const mockItems: IItemMock[] = [
      { id: '1', title: 'Item 1', isCompleted: false },
      { id: '2', title: 'Item 2', isCompleted: true },
    ];
    service.setAction(items, mockItems);

    const result: WritableSignal<IItemMock[]> = service.loadAction(items);
    expect(result()).toEqual(mockItems);
  });

  it('[createAction] should add an item correctly with createAction', () => {
    const mockItems: IItemMock = { id: '1', title: 'New Item', isCompleted: false };
    service.createAction(items, mockItems);

    const result: WritableSignal<IItemMock[]> = service.loadAction(items);
    expect(result()).toEqual([mockItems]);
  });

  it('[updateAction] should update an item correctly with updateAction', () => {
    const initialItem: IItemMock = {
      id: '1',
      title: 'Initial Item',
      isCompleted: false,
    };
    const updatedItem: IItemMock = {
      id: '1',
      title: 'Updated Item',
      isCompleted: true,
    };

    service.setAction(items, [initialItem]);
    service.updateAction(items, updatedItem);

    const result: WritableSignal<IItemMock[]> = service.loadAction(items);
    expect(result()).toEqual([updatedItem]);
  });

  it('[deleteAction] should delete an item correctly with deleteAction', () => {
    const item1: IItemMock = { id: '1', title: 'Item 1', isCompleted: false };
    const item2: IItemMock = { id: '2', title: 'Item 2', isCompleted: true };

    service.setAction(items, [item1, item2]);
    service.deleteAction(items, '1');

    const result: WritableSignal<IItemMock[]> = service.loadAction(items);
    expect(result()).toEqual([item2]);
  });

  it('[loadAction] should return the correct items with loadAction', () => {
    const mockItems: IItemMock[] = [
      { id: '1', title: 'Item 1', isCompleted: false },
      { id: '2', title: 'Item 2', isCompleted: true },
    ];
    service.setAction(items, mockItems);

    const result: WritableSignal<IItemMock[]> = service.loadAction(items);
    expect(result()).toEqual(mockItems);
  });
});
