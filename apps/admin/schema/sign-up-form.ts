import { z } from "zod";

export const SignUpFormSchema = z.object({
  username: z.string().min(4, {
    message: "Username must be at least 4 characters long",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long",
  }),
});
