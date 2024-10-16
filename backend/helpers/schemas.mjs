import z from "zod";

const createUserSchema = z.object({
  name: z.string().min("4").optional(),
  email: z.string().email(),
});

const updateUserSchema = z.object({
  name: z.string().min("4").optional(),
  email: z.string().email(),
  id: z.string().uuid(),
});

const createTaskSchema = z.object({
  name: z.string().min(4),
  description: z.string().optional(),
  date: z.date(),
  priority: z.number().min(1).max(5).optional(),
  userId: z.string().uuid(),
});
const updateTaskSchema = z.object({
  name: z.string().min(4),
  description: z.string().optional(),
  date: z.date(),
  priority: z.number().min(1).max(5).optional(),
  userId: z.string().uuid(),
  id: z.string().uuid(),
});

const idSchema = z.string().uuid();

export {
  createTaskSchema,
  createUserSchema,
  idSchema,
  updateTaskSchema,
  updateUserSchema,
};
