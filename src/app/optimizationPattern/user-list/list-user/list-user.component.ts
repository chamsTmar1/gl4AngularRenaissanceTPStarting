import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { User } from '../../users.service';
import { List } from 'immutable';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListUserComponent {
  @Input() users: List<User> = List<User>();

}
