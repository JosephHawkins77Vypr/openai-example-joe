import { z } from "zod";

export const birthdaysSchema = z.array(
  z.object({
    name: z.string(),
    birthday: z.string(),
  })
);

export const birthdaySchemaWrapper = z.object({
  birthdays: birthdaysSchema,
});
