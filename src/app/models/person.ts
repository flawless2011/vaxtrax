import { Immunization } from './immunization';

export interface Person {
  firstName: string;
  lastName: string;
  relationship: string;
  $key?: string;
  gender?: string;
  imageUrl?: string;
  vaccinations?: Immunization[];
}
