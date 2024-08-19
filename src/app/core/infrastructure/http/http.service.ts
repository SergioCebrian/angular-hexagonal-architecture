import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService<T> {

  readonly #apiUrl = environment.apiUrl;
  #http = inject(HttpClient);

  async getAll(url: string): Promise<T[]> {
    const http$: Observable<T[]> = this.#http.get<T[]>(`${ this.#apiUrl }/${ url }`);
    return await firstValueFrom(http$);
  }

  async getOne(url: string): Promise<T> {
    const http$: Observable<T> = this.#http.get<T>(`${ this.#apiUrl }/${ url }`);
    return await firstValueFrom(http$);
  }

  async create(url: string, data: unknown): Promise<T> {
    const http$: Observable<T> = this.#http.post<T>(`${ this.#apiUrl }/${ url }`, data);
    return await firstValueFrom(http$);
  }

  async update(url: string, data: unknown): Promise<T> {
    const http$: Observable<T> = this.#http.put<T>(`${ this.#apiUrl }/${ url }`, data);
    return await firstValueFrom(http$);
  }

  async delete(url: string): Promise<void> {
    const http$: Observable<void> = this.#http.delete<void>(`${ this.#apiUrl }/${ url }`);
    return await firstValueFrom(http$);
  }
}
