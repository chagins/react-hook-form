import { patterns } from "@/shared";
import { z } from "zod";

export const schema = z
  .intersection(
    z.object({
      name: z.string().min(1, { message: "Required" }),
      email: z
        .string()
        .min(1, { message: "Email is required" })
        .refine((text) => patterns.email.test(text), {
          message: "Email not valid",
        }),
      states: z
        .array(z.string())
        .min(1, "Must contain at least 1 state")
        .max(2, "Must contain at most 2 states"),
      languages: z.array(z.string()),
      gender: z.string().min(1),
      skills: z.array(z.string()).max(2, "Must contain at most 2 skills"),
      registrationDateAndTime: z.date(),
      formerEmploymentPeriod: z.array(z.date()).min(2).max(2),
      salaryRange: z.array(z.number()).min(2).max(2),
      isTeacher: z.boolean(),
    }),
    z.discriminatedUnion("variant", [
      z.object({ variant: z.literal("create") }),
      z.object({ variant: z.literal("edit"), id: z.string().min(1) }),
    ])
  )
  .and(
    z.union([
      z.object({ isTeacher: z.literal(false) }),
      z.object({
        isTeacher: z.literal(true),
        students: z.array(
          z.object({
            name: z.string().min(4),
          })
        ),
      }),
    ])
  );
export type Schema = z.infer<typeof schema>;

export const defaultValues: Schema = {
  variant: "create",
  name: "",
  email: "",
  states: [],
  languages: [],
  gender: "",
  skills: [],
  registrationDateAndTime: new Date(),
  formerEmploymentPeriod: [new Date(), new Date()],
  salaryRange: [0, 2000],
  isTeacher: false,
};
