import { z } from "zod";

export const PropertyFormSchema = z.object({
  project: z.string().min(1, {
    message: "Project name is required",
  }),
  type: z.string().min(1, { message: "Property type is required" }),
  possession: z.date(),
  price: z.string().min(1, { message: "Price is required" }),
  status: z.string().min(1, { message: "Status is required" }),
  location: z.string().optional(),
});
