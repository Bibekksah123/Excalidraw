import { z } from "zod";

export const userSingUp = z.object({
  username: z.string(),
  email: z.string().email({ message: "Invalid email address." }),
  password: z
    .string()
    .min(5, { message: "password should be at least 5 character" }),
});

export const userLogin = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z
    .string()
    .min(5, { message: "password should be at least 5 character" }),
});

export const createRoom = z.object({
  name:z.string().min(3).max(20)
})
