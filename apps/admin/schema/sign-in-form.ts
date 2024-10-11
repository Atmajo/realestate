import { z } from "zod";

export const SignInFormSchema = z.object({
  email: z.string().email({
    message: "Email must be valid",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long",
  }),
});
