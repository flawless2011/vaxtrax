export interface Immunization {
  name: string;
  type: string;
  scheduledDate: Date;
  dosageValue: number;
  dosageUnit: string;
  $key?: string;
  id?: string;
  completedDate?: Date;
}
