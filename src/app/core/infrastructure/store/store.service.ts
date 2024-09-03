import { Injectable, WritableSignal } from '@angular/core';
import { IStore } from './store.interface';

@Injectable({
  providedIn: 'root',
})
export class StoreService<T extends { id: string }> implements IStore<T> {
  deleteAction(prop: WritableSignal<T[]>, id: string): void {
    return prop.update((items: T[]) =>
      items.filter((item: T) => item.id !== id)
    );
  }

  loadAction(prop: WritableSignal<T[]>): WritableSignal<T[]> {
    return prop;
  }

  createAction(prop: WritableSignal<T[]>, item: T): void {
    return prop.update((items: T[]) => [...items, item]);
  }

  setAction(prop: WritableSignal<T[]>, items: T[]): void {
    return prop.set(items);
  }

  updateAction(prop: WritableSignal<T[]>, item: T): void {
    return prop.update((items: T[]) =>
      items.map((existingItem: T) =>
        existingItem.id === item.id ? item : existingItem
      )
    );
  }
}
