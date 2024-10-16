import prisma from "./index.mjs";

async function createTask({ name, description, date, priority, userId }) {
  const task = await prisma.task.create({
    data: { name, description, priority, date },
    where: { userId },
  });
  return task;
}

async function getTasks({ userId }) {
  const tasks = await prisma.task.findMany({ where: { userId } });
  return tasks;
}

async function getTaskById({ userId, id }) {
  const task = await prisma.task.findUnique({
    where: { userId, id },
  });
  return task;
}

async function updateTask({ name, description, date, priority, userId, id }) {
  const task = await prisma.task.update({
    data: { name, description, priority, date },
    where: { userId, id },
  });
  return task;
}

async function deleteTask({ id, userId }) {
  const task = await prisma.task.delete({
    where: { id, userId },
  });
  return task;
}

const model = { createTask, deleteTask, getTaskById, getTasks, updateTask };

export default model;
