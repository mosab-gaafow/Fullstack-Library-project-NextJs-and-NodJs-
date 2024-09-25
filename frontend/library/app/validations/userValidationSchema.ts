import { z } from "zod";

export const userValidationSchema = z.object({
  fullname: z
    .string()
    .min(6, "Name should be at least 6 characters.")
    .max(100, "Name should be less than 100 characters."),
  phone: z
    .string()
    .min(6, "Phone number should be at least 6 digits.")
    .max(15, "Phone number should be less than 15 digits."),
    // .regex(/^[1-9]\d*$/, "Phone number should not start with 0"),
  email: z.string().email(),
  password: z.string().min(6, "Password should be at least 6 characters."),
  role: z.string(),
});
