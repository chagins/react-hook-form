import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DevTool } from "@hookform/devtools";
import { defaultValues, schema, Schema } from "../../model";
import { UserForm } from "../UserForm";

export const UserFormProvider = () => {
  const methods = useForm<Schema>({
    mode: "all",
    resolver: zodResolver(schema),
    defaultValues,
  });

  return (
    <FormProvider {...methods}>
      <UserForm />
      <DevTool control={methods.control} />
    </FormProvider>
  );
};
