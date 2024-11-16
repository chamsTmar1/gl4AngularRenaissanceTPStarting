import { TodoStatus } from 'src/app/todo/model/todo';

export const CONSTANTES: {
  waiting: TodoStatus;
  tokenKey: string;
  userData: string;
  inProgress: TodoStatus;
  done: TodoStatus;
  defaultImage: string;
} = {
  waiting: 'waiting',
  inProgress: 'inprogress',
  done: 'done',
  defaultImage: 'cv.png',
  tokenKey: 'token',
  userData: 'userData',
};
