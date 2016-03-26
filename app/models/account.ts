import {Person} from './person';

export interface Account {
  _id: string;
  __v: number;
  loginId: string;
  loginService: string;
  email: string;
  addPersonUrl: string;
  updateAccountUrl: string;
  family: Person [];
}
