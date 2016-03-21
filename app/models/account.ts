import {Person} from './person';

export interface Account {
  loginId: string;
  loginService: string;
  email: string;
  addPersonUrl: string;
  updateAccountUrl: string;
  family: Person [];
}
