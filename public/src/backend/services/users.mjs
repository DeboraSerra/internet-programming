import {
  createUserSchema,
  idSchema,
  updateUserSchema,
} from "../helpers/schemas.mjs";
import model from "../models/users.mjs";

async function createUser(userObj) {
  const user = createUserSchema.safeParse(userObj);
  if (!user.success) throw new Error(user.error);
  const created = await model.createUser(user.data);
  return created;
}

async function getUser(obj) {
  const { data: email, success, error } = emailSchema.safeParse(obj.email);
  if (!success) return false;
  const user = await model.getUser({ email });
  return user;
}

async function updateUser(userObj) {
  const user = updateUserSchema.safeParse(userObj);
  if (!user.success) throw new Error(user.error);
  const created = await model.updateUser(user.data);
  return created;
}

async function deleteUser(obj) {
  const { data: id, success, error } = idSchema.safeParse(obj.id);
  if (!success) throw new Error(error);
  const user = await model.deleteUser({ id });
  return user;
}

const service = { createUser, deleteUser, getUser, updateUser };

export default service;
