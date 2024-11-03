interface Create {
  variant: "create";
}

interface Edit {
  variant: "edit";
  id: number;
}

export interface Common {
  email: string;
  formerEmploymentPeriod: string[];
  name: string;
  gender: string;
  languagesSpoken: string[];
  registrationDateAndTime: string;
  salaryRange: number[];
  skills: string[];
  states: string[];
  isTeacher: boolean;
  students: Student[];
}

interface Student {
  name: string;
}

export type ApiCreateEdit = Common & (Create | Edit);
export type ApiGet = Edit & Common;
