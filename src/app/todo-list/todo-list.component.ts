import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  todos: any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.fetchTodos();
  }

  fetchTodos(): void {
    fetch('https://dummyjson.com/todos')
      .then(response => response.json())
      .then(data => {
        this.todos = data.todos.slice(0, 10);
      })
      .catch(error => console.error('Não foi possível encontrar tarefas', error));
  }

  toggleComplete(todo: any): void {
    todo.completed = !todo.completed;
  }
}
