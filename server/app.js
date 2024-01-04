import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";

import route from "./routes/route.js";
import connectToDatabase from "./configs/db.js";
import { FRONTEND_URL } from "./configs/server.js";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use(express.json());
app.use(cors({
    origin: FRONTEND_URL,
}));

app.use("/api/v1", route);

connectToDatabase();

export default app;