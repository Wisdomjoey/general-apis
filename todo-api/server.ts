import bodyParser from "body-parser";
import express from "express";
import http from "http";
import { connectDB } from "./config/dbConfig";
import userRouter from "./routes/userRoute";
import taskRouter from "./routes/taskRoute";

const app = express();
const server = http.createServer(app);

app.use(bodyParser.json());
app.use("/api/", userRouter);
app.use("/api/", taskRouter);

app.disable("x-powered-by");

app.get("/", (_, res) => res.status(200).send("Server Running"));

connectDB();

server.listen("8080", () => console.log("Listening on port 8080"));
