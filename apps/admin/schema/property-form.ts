import { z } from "zod";

export const PropertyFormSchema = z.object({
  name: z.string().min(1, {
    message: "Name name is required",
  }),
  type: z.string().min(1, { message: "Property type is required" }),
  possession: z.date(),
  price: z.string().min(1, { message: "Price is required" }),
  status: z.string().min(1, { message: "Status is required" }),
  place: z.string().optional(),
  company: z.string().optional(),
  size: z.string().optional(),
  image: z.array(z.string()).optional(),
  insideImg: z.array(z.string()).optional(),
  desc: z.string().optional(),
  startDate: z.date().optional(),
});
