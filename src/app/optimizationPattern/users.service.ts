import { Injectable } from '@angular/core';
import { faker } from '@faker-js/faker';
import { List } from 'immutable';

export interface User {
  name: string,
  age: number
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  users: List<User> = List();
  
  constructor() {
    let usersArray: User[] = [];
    for (let i = 0; i < 50; i++) {
      usersArray.push({
        name: faker.name.fullName(),
        age: faker.datatype.number({ min: 18, max: 30 })
      });
    }
    this.users = List(usersArray);
  }

  getOddOrEven(isOdd = false): List<User> {
    return this.users.filter((user) => !!(user.age % 2) == isOdd) as List<User>;
  }

  addUser(list: List<User>, name: string): List<User> {
    return list.unshift({
      name,
      age: faker.datatype.number({ min: 18, max: 30 })
    });
  }
}
