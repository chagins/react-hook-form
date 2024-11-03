import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ApiGet, Option, Schema } from "../model";

export const useStates = () => {
  return useQuery({
    queryKey: ["states"],
    queryFn: async (): Promise<Option[] | undefined> =>
      (await axios.get<Option[]>("http://localhost:8080/states")).data,
  });
};

export const useLanguages = () => {
  return useQuery({
    queryKey: ["languages"],
    queryFn: async (): Promise<Option[] | undefined> =>
      (await axios.get<Option[]>("http://localhost:8080/languages")).data,
  });
};

export const useGenders = () => {
  return useQuery({
    queryKey: ["genders"],
    queryFn: async (): Promise<Option[] | undefined> =>
      (await axios.get<Option[]>("http://localhost:8080/genders")).data,
  });
};

export const useSkills = () => {
  return useQuery({
    queryKey: ["skills"],
    queryFn: async (): Promise<Option[] | undefined> =>
      (await axios.get<Option[]>("http://localhost:8080/skills")).data,
  });
};

export const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: async (): Promise<Option[] | undefined> =>
      (await axios.get<ApiGet[]>("http://localhost:8080/users")).data.map(
        (user) => ({ id: user.id.toString(), label: user.name })
      ),
  });
};

export const useUser = (userId: string) => {
  return useQuery({
    queryKey: ["user", { id: userId }],
    queryFn: async (): Promise<Schema> => {
      const { data } = await axios.get<ApiGet>(
        `http://localhost:8080/users/${userId}`
      );
      return {
        variant: "edit",
        id: data.id.toString(),
        name: data.name,
        email: data.email,
        formerEmploymentPeriod: [
          new Date(data.formerEmploymentPeriod[0]),
          new Date(data.formerEmploymentPeriod[1]),
        ],
        gender: data.gender,
        languages: data.languagesSpoken,
        registrationDateAndTime: new Date(data.registrationDateAndTime),
        salaryRange: [data.salaryRange[0], data.salaryRange[1]],
        skills: data.skills,
        states: data.states,
        isTeacher: data.isTeacher,
        students: data.students,
      };
    },
    enabled: !!userId,
  });
};
