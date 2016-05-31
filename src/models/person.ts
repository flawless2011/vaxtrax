import {Immunization} from './immunization';

export interface Person {
  firstName: string;
  lastName: string;
  relationship: string;
  gender: string;
  imageURL: string;
  immunizations: Immunization[];
}
