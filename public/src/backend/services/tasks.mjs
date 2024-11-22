import {
  createTaskSchema,
  idSchema,
  updateTaskSchema,
} from "../helpers/schemas.mjs";
import model from "../models/tasks.mjs";

async function createTask(taskObj) {
  const parsedTask = createTaskSchema(taskObj);
  if (!parsedTask.success) return parsedTask;
  const task = await model.createTask(parsedTask.data);
  return task;
}

async function getTasks({ userId }) {
  const parsedTask = idSchema(userId);
  if (!parsedTask.success) return parsedTask;
  const tasks = await model.getTasks({userId:parsedTask.data.id});
  return tasks;
}

async function getTaskById({ userId, id }) {
  const userIdParsed = idSchema(userId);
  if (!userIdParsed.success) return userIdParsed;
  const taskId = idSchema(id);
  if (!taskId.success) return taskId;
  const task = await model.getTaskById({
    userId: userIdParsed.data.id,
    id: taskId.data.id,
  });
  return task;
}

async function updateTask(taskObj) {
  const task = updateTaskSchema(taskObj);
  if (!task.success) return task;
  const updated = await model.updateTask(task.data);
  return updated;
}

async function completeTask({ userId, id }) {
  const userIdParsed = idSchema(userId);
  if (!userIdParsed.success) return userIdParsed;
  const taskId = idSchema(id);
  if (!taskId.success) return taskId;
  const updated = await model.completeTask({
    id: taskId.data.id,
    userId: userIdParsed.data.id,
  });
  return updated;
}

async function deleteTask({ id, userId }) {
  const userIdParsed = idSchema(userId);
  if (!userIdParsed.success) return userIdParsed;
  const taskId = idSchema(id);
  if (!taskId.success) return taskId;
  const task = await model.deleteTask({
    userId: userIdParsed.data.id,
    id: taskId.data.id,
  });
  return task;
}

const service = {
  createTask,
  deleteTask,
  getTaskById,
  getTasks,
  updateTask,
  completeTask,
};

export default service;
