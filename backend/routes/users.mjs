import { Router } from "express";
import {
  createUser,
  deleteUser,
  getUser,
  updateUser,
} from "../controllers/users.mjs";

const users = Router();

users.route("/").post(createUser);

users.route("/:id").get(getUser).put(updateUser).delete(deleteUser);

export default users;