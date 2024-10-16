import z from "zod";

const createUserSchema = z.object({
  name: z.string().min("4").optional(),
  email: z.string().email(),
});

const updateUserSchema = z.object({
  name: z.string().min("4").optional(),
  email: z.string().email(),
  id: z.string().length(36).uuid(),
});

const idSchema = z.string().uuid();

export { createUserSchema, updateUserSchema, idSchema };
