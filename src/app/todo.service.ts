import { Injectable } from '@angular/core';
import { Observable, from, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl = 'https://dummyjson.com/todos';

  constructor() { }

  getTodos(): Observable<any[]> {
    return from(fetch(this.apiUrl).then(response => response.json())).pipe(
      map(data => data.todos || []),
      catchError(error => {
        console.error('Erro ao buscar TODOs', error);
        return of([]);
      })
    );
  }

  updateTodo(todo: any): Observable<any> {
    return from(fetch(`${this.apiUrl}/${todo.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(todo)
    }).then(response => response.json())).pipe(
      catchError(error => {
        console.error('Erro ao atualizar TODO', error);
        return of(null);
      })
    );
  }
}
