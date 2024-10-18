import cors from "cors";
import "dotenv/config";
import express from "express";
import "express-async-errors";
import { ErrorHandler } from "./helpers/errors.mjs";
import tasks from "./routes/tasks.mjs";
import users from "./routes/users.mjs";

const { PORT } = process.env;

const app = express();
app.use(express.json());
app.use(cors());

app.use("/users", users);
app.use("/tasks", tasks);

app.use(ErrorHandler);

app.listen(PORT, () => console.log(`server running on ${PORT}`));
