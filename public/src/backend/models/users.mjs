import prisma from "./index.mjs";

async function createUser({ name, email, photo, birthday, phone }) {
  const newUser = await prisma.user.create({
    data: { name, email, photo, birthday, phone },
  });
  return newUser;
}

async function getUser({ email }) {
  const user = await prisma.user.findUnique({ where: { email } });
  return user;
}

async function updateUser({ name, email, id, photo, birthday, phone }) {
  const user = await prisma.user.update({
    data: { name, email, photo, birthday, phone },
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
