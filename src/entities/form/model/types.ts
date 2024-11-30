export interface IFormValues {
  firstName: string | undefined;
  iceCreamType: IceCreamType | undefined;
}

export interface IceCreamType {
  value: string;
  label: string;
}
