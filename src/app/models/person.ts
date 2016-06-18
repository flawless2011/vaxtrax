import {Immunization} from './immunization';

export interface Person {
  firstName: string;
  lastName: string;
  relationship: string;
  gender?: string;
  imageUrl?: string;
  completed?: Immunization[];
  upcoming?: Immunization[];
}
