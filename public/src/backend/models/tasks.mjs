import prisma from "./index.mjs";

async function createTask({ name, description, date, priority, userId }) {
  const task = await prisma.task.create({
    data: { name, description, priority, date, userId },
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

async function updateTask(taskObj) {
  const { name, description, date, priority, userId, id, completed } = taskObj;
  const task = await prisma.task.update({
    data: { name, description, priority, date, completed },
    where: { userId, id },
  });
  return task;
}

async function completeTask({ userId, id }) {
  const oldTask = await prisma.task.findUnique({
    where: { userId, id },
  });
  const task = await prisma.task.update({
    data: { completed: !oldTask.completed },
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

const model = {
  createTask,
  deleteTask,
  getTaskById,
  getTasks,
  updateTask,
  completeTask,
};

export default model;
