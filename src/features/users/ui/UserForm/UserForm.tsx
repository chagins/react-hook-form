import {
  SubmitHandler,
  useFieldArray,
  useFormContext,
  useWatch,
} from "react-hook-form";
import {
  Button,
  Container,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Stack,
  Typography,
} from "@mui/material";
import { defaultValues, schema, Schema } from "../../model";
import {
  useGenders,
  useLanguages,
  useSkills,
  useStates,
  useUser,
  useUsers,
} from "../../api";
import { ControlledAutocomplete } from "../ControlledAutocomplete";
import { Fragment, useEffect } from "react";
import { ControlledButtonGroup } from "../ControlledButtonGroup";
import { ControlledRadioGroup } from "../ControlledRadioGroup";
import { ControlledCheckbox } from "../ControlledCheckbox";
import { ControlledDateTimePicker } from "../ControlledDateTimePicker";
import { ControlledDateRangePicker } from "../ControlledDateRangePicker";
import { ControlledSlider } from "../ControlledSlider";
import { ControlledSwitch } from "../ControlledSwitch";
import { ControlledTextField } from "../ControlledTextField";
import { useCreateUser, useEditUser } from "../../api/mutations";

export const UserForm = () => {
  const statesQuery = useStates();
  const languagesQuery = useLanguages();
  const gendersQuery = useGenders();
  const skillsQuery = useSkills();
  const usersQuery = useUsers();
  const createUserMutation = useCreateUser();
  const editUserMutation = useEditUser();

  const {
    watch,
    control,
    unregister,
    reset,
    setValue,
    handleSubmit,
    getValues,
  } = useFormContext<Schema>();

  const isTeacher = useWatch({ control, name: "isTeacher" });
  const id = useWatch({ control, name: "id" });
  const variant = useWatch({ control, name: "variant" });

  const userQuery = useUser(id);

  useEffect(() => {
    const subscription = watch((value) => {
      console.log(value);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [watch]);

  const { append, remove, replace, fields } = useFieldArray({
    control,
    name: "students",
  });

  useEffect(() => {
    if (!isTeacher) {
      replace([]);
      unregister("students");
    }
  }, [isTeacher, replace, unregister]);

  useEffect(() => {
    if (userQuery.data) {
      reset(userQuery.data);
    }
  }, [reset, userQuery.data]);

  const handleReset = () => {
    reset(defaultValues);
  };

  const handleUserClick = (userId: string) => {
    setValue("id", userId);
  };

  const onSubmit: SubmitHandler<Schema> = (data) => {
    if (variant === "create") {
      createUserMutation.mutate(data);
    } else {
      editUserMutation.mutate(data);
    }
  };

  return (
    <Container maxWidth="sm" component="form" onSubmit={handleSubmit(onSubmit)}>
      <Stack sx={{ flexDirection: "row", gap: 2 }}>
        <List subheader={<ListSubheader>Users</ListSubheader>}>
          {usersQuery.data?.map((user) => (
            <ListItem key={user.id} disablePadding>
              <ListItemButton
                onClick={() => {
                  handleUserClick(user.id);
                }}
                selected={id === user.id}
              >
                <ListItemText primary={user.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Stack gap={2}>
          <ControlledTextField<Schema> name="name" label="Name" />
          <ControlledTextField<Schema> name="email" label="Email" />
          <ControlledAutocomplete<Schema>
            name="states"
            options={statesQuery.data}
            label="States"
          />
          <ControlledButtonGroup<Schema>
            name="languages"
            options={languagesQuery.data}
          />
          <ControlledRadioGroup<Schema>
            name="gender"
            label="Gender"
            options={gendersQuery.data}
          />
          <ControlledCheckbox
            name="skills"
            label="Skills"
            options={skillsQuery.data}
          />
          <ControlledDateTimePicker<Schema>
            name="registrationDateAndTime"
            label="Registration Date & Time"
          />
          <Typography>Former employment period:</Typography>
          <ControlledDateRangePicker<Schema> name="formerEmploymentPeriod" />
          <ControlledSlider<Schema> name="salaryRange" label="Salary range" />
          <ControlledSwitch<Schema> name="isTeacher" label="Are you teacher?" />

          {isTeacher && (
            <Button
              onClick={() => {
                append({ name: "" });
              }}
              type="button"
            >
              Add new student
            </Button>
          )}

          {fields.map((field, index) => (
            <Fragment key={field.id}>
              <ControlledTextField
                name={"students." + String(index) + ".name"}
                label="Student name"
                key={field.id}
              />
              <Button
                color="error"
                onClick={() => {
                  remove(index);
                }}
                type="button"
              >
                Remove
              </Button>
            </Fragment>
          ))}

          <Stack sx={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Button type="submit" variant="contained">
              {variant === "create" ? "New user" : "Edit user"}
            </Button>
            <Button onClick={() => schema.parse(getValues())}>parse</Button>
            <Button type="button" onClick={handleReset}>
              Reset
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
};
