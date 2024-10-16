import { Router } from "express";

const users = Router();

users
  .get("/:id", getUser)
  .put("/:id", getUser)
  .post("/:id", getUser)
  .delete("/:id", getUser);
