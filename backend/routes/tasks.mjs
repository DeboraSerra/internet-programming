import { Router } from "express";
import {
  createTask,
  deleteTask,
  getTaskById,
  getTasks,
  updateTask,
} from "../controllers/tasks.mjs";

const tasks = Router();

tasks.route("/").get(getTasks).post(createTask);

tasks.route("/:id").get(getTaskById).put(updateTask).delete(deleteTask);

export default tasks;
