import { Component, inject, signal } from '@angular/core';
import { Todo, TodoStatus } from '../model/todo';
import { TodoService } from '../service/todo.service';
import { CONSTANTES } from 'src/config/const.config';

import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-todo',
    templateUrl: './todo.component.html',
    styleUrls: ['./todo.component.css'],
    providers: [TodoService],
    standalone: true,
    imports: [FormsModule],
})
export class TodoComponent {

  private todoService = inject(TodoService);
  todosSignal=signal<Todo[]>([]);
  Constantes=CONSTANTES;
  todo = new Todo();
  
  constructor(){
    this.todosSignal.set(this.todoService.getTodos())
  }

  addTodo() {
    this.todoService.addTodo(this.todo);
    this.todo = new Todo();
  }

  deleteTodo(todo: Todo) {
    this.todoService.deleteTodo(todo);
  }

  changeStatus(id:number,newStatus:TodoStatus){

    this.todoService.updateStatus(id,newStatus)
    
    //const todo = this.todoService.getTodos().find(todo => todo.id === id);
    //if (todo) {
      //todo.status = newStatus; 

    //}
    console.log("After change",this.todosSignal())
     
    
  }
}
