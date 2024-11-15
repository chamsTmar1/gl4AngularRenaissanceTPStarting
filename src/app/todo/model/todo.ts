export type TodoStatus = 'waiting' | 'inprogress' | 'done';

export class Todo {
  constructor(
    public id=0,
    public name = '',
    public content= '',
    public status='waiting'
  ) {}
}
