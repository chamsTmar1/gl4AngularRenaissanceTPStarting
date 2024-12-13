import {Component, Input, Output, EventEmitter, ChangeDetectionStrategy} from '@angular/core';
import {User} from "../users.service";
import { List } from 'immutable';

export const fibonnaci = (n: number): number => {
  if (n==1 || n==0) {
    return 1;
  }
  return fibonnaci(n-1) + fibonnaci(n-2);
}

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent {
  @Input() usersCluster: string = '';
  @Input() users: List<User> = List<User>();
  @Output() add = new EventEmitter<string>();
  userFullName: string = '';
  addUser() {
    this.add.emit(this.userFullName);
    this.userFullName = '';
  }
  fibo(n: number): number {
    const fib = fibonnaci(n);
    console.log({n, fib});

    return fib;
  }
}
