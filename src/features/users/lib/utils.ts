import { ApiCreateEdit, Common, Schema } from "../model";

export function mapData(data: Schema): ApiCreateEdit {
  const common: Common = {
    email: data.email,
    formerEmploymentPeriod: [
      data.formerEmploymentPeriod[0].toString(),
      data.formerEmploymentPeriod[1].toString(),
    ],
    name: data.name,
    gender: data.gender,
    languagesSpoken: data.languages,
    registrationDateAndTime: data.registrationDateAndTime.toString(),
    salaryRange: [data.salaryRange[0], data.salaryRange[1]],
    skills: data.skills,
    states: data.states,
    isTeacher: data.isTeacher,
    students: data.isTeacher ? data.students : [],
  };

  switch (data.variant) {
    case "create": {
      return { ...common, variant: data.variant };
    }
    case "edit": {
      return { ...common, id: Number(data.id), variant: data.variant };
    }
  }
}
