import prisma from "./index.mjs";

async function createUser({ name, email }) {
  const newUser = await prisma.user.create({ data: { name, email } });
  return newUser;
}

async function getUser({ email }) {
  const user = await prisma.user.findUnique({ where: { email } });
  return user;
}

async function updateUser({ name, email, id }) {
  const user = await prisma.user.update({
    data: { name, email },
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
