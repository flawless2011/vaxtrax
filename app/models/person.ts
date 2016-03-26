import {Immunization} from './immunization';

export interface Person {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  relationship: string;
  immunizations: Immunization[];
}
