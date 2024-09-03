import { WritableSignal } from "@angular/core";

export interface IStore<T> {
    deleteAction(prop: WritableSignal<T[]>, id: string): void;
    loadAction(prop: WritableSignal<T[]>): WritableSignal<T[]>;
    createAction(prop: WritableSignal<T[]>, item: T): void;
    setAction(prop: WritableSignal<T[]>, items: T[]): void;
    updateAction(prop: WritableSignal<T[]>, item: T): void;
}