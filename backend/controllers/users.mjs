import service from "../services/users.mjs";

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
async function createUser(req, res) {
  const { user } = req.body;
  const created = await service.createUser(user);
  return res.status(201).json({ user: created });
}

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
async function getUser(req, res) {
  const { id } = req.params;
  const user = await service.getUser({ id });
  return res.status(200).json({ user });
}

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
async function updateUser(req, res) {
  const { user } = req.body;
  const { id } = req.params;
  const created = await service.updateUser({ id, ...user });
  return res.status(200).json({ created });
}

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
async function deleteUser(req, res) {
  const { id } = req.params;
  const user = await service.deleteUser({ id });
  return res.status(203).json({ user });
}

export { createUser, deleteUser, getUser, updateUser };
