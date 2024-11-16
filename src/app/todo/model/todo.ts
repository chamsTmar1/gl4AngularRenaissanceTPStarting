export type TodoStatus = 'waiting' | 'inprogress' | 'done';

export class Todo {
  constructor(
    public name = '',
    public content= '',
    public status='waiting'
  ) {}
}
