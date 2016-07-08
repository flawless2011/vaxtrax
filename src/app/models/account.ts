import { Person } from './person';

export interface Account {
  loginId: string;
  loginSystem: string;
  email: string;
  family: Person [];
}
