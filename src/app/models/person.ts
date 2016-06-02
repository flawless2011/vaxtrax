import {Immunization} from './immunization';

export class Person {
  constructor(
    firstName: string,
    lastName: string,
    relationship: string,
    gender: string,
    imageURL?: string,
    immunizations?: Immunization[]
  ) {}
}
