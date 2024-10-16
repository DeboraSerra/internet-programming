import service from "../services/tasks.mjs";

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
async function createTask(req, res) {
  const { task } = req.body;
  const created = await service.createTask(task);
  return res.status(202).json({ task: created });
}

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
async function getTasks(req, res) {
  const { userId } = req.query;
  const tasks = await service.getTasks({ userId });
  return res.status(200).json({ tasks });
}

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
async function getTaskById(req, res) {
  const { id } = req.params;
  const { userId } = req.query;
  const task = await service.getTaskById({
    userId,
    id,
  });
  return res.status(200).json({ task });
}

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
async function updateTask(req, res) {
  const { id } = req.params;
  const { userId } = req.query;
  const { task } = req.body;
  const updated = await service.updateTask({ id, userId, ...task });
  return res.status(200).json({ task: updated });
}

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
async function deleteTask(req, res) {
  const { id } = req.params;
  const { userId } = req.query;
  const task = await service.deleteTask({
    userId,
    id,
  });
  return res.status(200).json({ task });
}

export { createTask, deleteTask, getTaskById, getTasks, updateTask };
