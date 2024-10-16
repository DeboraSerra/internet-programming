import {
  createTaskSchema,
  idSchema,
  updateTaskSchema,
} from "../helpers/schemas.mjs";
import model from "../models/tasks.mjs";

async function createTask(taskObj) {
  const { data, success, error } = createTaskSchema.safeParse(taskObj);
  if (!success) throw new Error(error);
  const task = await model.createTask(data);
  return task;
}

async function getTasks({ userId }) {
  const { data: id, success, error } = idSchema.safeParse(userId);
  if (!success) throw new Error(error);
  const tasks = await model.getTasks({ id });
  return tasks;
}

async function getTaskById({ userId, id }) {
  const userIdParsed = idSchema.safeParse(userId);
  if (!userId.success) throw new Error(userIdParsed.error);
  const taskId = idSchema.safeParse(id);
  if (!taskId.success) throw new Error(taskId.error);
  const task = await model.getTaskById({
    userId: userIdParsed.data,
    id: taskId.data,
  });
  return task;
}

async function updateTask(taskObj) {
  const task = updateTaskSchema.safeParse(taskObj);
  if (!task.success) throw new Error(task.error);
  const updated = await model.updateTask(task.data);
  return updated;
}

async function deleteTask({ id, userId }) {
  const userIdParsed = idSchema.safeParse(userId);
  if (!userId.success) throw new Error(userIdParsed.error);
  const taskId = idSchema.safeParse(id);
  if (!taskId.success) throw new Error(taskId.error);
  const task = await model.deleteTask({
    userId: userIdParsed.data,
    id: taskId.data,
  });
  return task;
}

const service = {
  createTask,
  deleteTask,
  getTaskById,
  getTasks,
  updateTask,
};

export default service;
