import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService<T> {

  readonly #apiUrl = environment.apiUrl;
  #http = inject(HttpClient);

  getAll(url: string): Observable<T[]> {
    return this.#http.get<T[]>(`${ this.#apiUrl }/${ url }`);
  }

  getOne(url: string): Observable<T> {
    return this.#http.get<T>(`${ this.#apiUrl }/${ url }`);
  }

  create(url: string, data: unknown): Observable<T> {
    return this.#http.post<T>(`${ this.#apiUrl }/${ url }`, data);
  }

  update(url: string, data: unknown): Observable<T> {
    return this.#http.put<T>(`${ this.#apiUrl }/${ url }`, data);
  }

  delete(url: string): Observable<void> {
    return this.#http.delete<void>(`${ this.#apiUrl }/${ url }`);
  }
}
