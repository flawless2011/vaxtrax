export interface Immunization {
  id: string;
  name: string;
  type: string;
  scheduledDate: Date;
  dosageValue: number;
  dosageUnit: string;
  completedDate?: Date;
}
