import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoComponent } from './todo/todo.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    TodoComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    TodoComponent
  ]
})
export class TodoModule { }
