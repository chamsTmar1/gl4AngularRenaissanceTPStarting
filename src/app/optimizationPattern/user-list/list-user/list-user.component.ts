import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { User } from '../../users.service';
import { List } from 'immutable';

export const fibonnaci = (n: number): number => {
  if (n==1 || n==0) {
    return 1;
  }
  return fibonnaci(n-1) + fibonnaci(n-2);
}

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListUserComponent {
  @Input() users: List<User> = List<User>();

  fibo(n: number): number {
    const fib = fibonnaci(n);
    console.log({n, fib});

    return fib;
  }
}
