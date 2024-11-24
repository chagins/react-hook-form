export enum GenderEnum {
  female = "female",
  male = "male",
  other = "other",
}

export interface Inputs {
  firstName: string;
  gender: GenderEnum;
  age: number;
}
