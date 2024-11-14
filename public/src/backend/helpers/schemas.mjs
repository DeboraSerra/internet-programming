import z from "zod";

const createUserSchema = z.object({
  name: z.string().min("4").optional(),
  email: z.string().email(),
  photo: z.string().url().optional(),
  birthday: z.date({ coerce: true }).optional(),
});

const updateUserSchema = z.object({
  name: z.string().min("4").optional(),
  photo: z.string().url().optional(),
  email: z.string().email(),
  id: z.string().length(24),
  birthday: z.date({ coerce: true }).optional(),
});

const createTaskSchema = z.object({
  name: z.string().min(4),
  description: z.string().optional(),
  date: z.date({ coerce: true }),
  priority: z.number().min(1).max(5).optional(),
  userId: z.string().length(24),
});
const updateTaskSchema = z.object({
  name: z.string().min(4),
  description: z.string().optional(),
  date: z.date(),
  priority: z.number().min(1).max(5).optional(),
  userId: z.string().length(24),
  id: z.string().length(24),
});

const idSchema = z.string().length(24);

const emailSchema = z.string().email();

export {
  createTaskSchema,
  createUserSchema,
  emailSchema,
  idSchema,
  updateTaskSchema,
  updateUserSchema,
};
