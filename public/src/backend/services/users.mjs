import {
  createUserSchema,
  emailSchema,
  idSchema,
  updateUserSchema,
} from "../helpers/schemas.mjs";
import model from "../models/users.mjs";

async function createUser(userObj) {
  const user = createUserSchema(userObj);
  if (!user.success) {
    return user
  }
  const created = await model.createUser(user.data);
  return created;
}

async function getUser(obj) {
  const email = emailSchema(obj.email);
  if (!email.success) return false;
  const user = await model.getUser(email.data);
  return user;
}

async function updateUser(userObj) {
  const user = updateUserSchema(userObj);
  if (!user.success) return user
  const created = await model.updateUser(user.data);
  return created;
}

async function deleteUser(obj) {
  const user = idSchema(obj.id);
  if (!user.success) return user
  const userDeleted = await model.deleteUser({ id });
  return userDeleted;
}

const service = { createUser, deleteUser, getUser, updateUser };

export default service;
