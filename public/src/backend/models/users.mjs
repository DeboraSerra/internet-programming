import prisma from "./index.mjs";

async function createUser({ name, email, photo }) {
  const newUser = await prisma.user.create({ data: { name, email, photo } });
  return newUser;
}

async function getUser({ email }) {
  const user = await prisma.user.findUnique({ where: { email } });
  return user;
}

async function updateUser({ name, email, id, photo }) {
  const user = await prisma.user.update({
    data: { name, email, photo },
    where: { id },
  });
  return user;
}

async function deleteUser({ id }) {
  const user = await prisma.user.delete({ where: { id } });
  return user;
}

const model = { createUser, deleteUser, getUser, updateUser };

export default model;
