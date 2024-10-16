import cors from "cors";
import "dotenv/config";
import express from "express";
import "express-async-errors";

const { PORT } = process.env;

const app = express();
app.use(express.json());
app.use(cors());

app.use('/users')

app.listen(PORT, () => console.log(`server running on ${PORT}`));
