import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-input-user',
  templateUrl: './input-user.component.html',
  styleUrls: ['./input-user.component.css']
})
export class InputUserComponent {
  @Output() add = new EventEmitter<string>();
  userFullName: string = '';
  
  addUser() {
    this.add.emit(this.userFullName);
    this.userFullName = '';
  }

}
