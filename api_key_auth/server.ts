import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cors from "cors";
import { connectDB } from "./config/db_config";
import userRouter from "./routes/user";
import postRouter from "./routes/post";
import authRouter from "./routes/auth";

const app = express();

const server = http.createServer(app);

app.use(express.json());
app.use(
	cors({
		origin: ["http://localhost:8080"],
	})
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/api/", userRouter);
app.use("/api/", postRouter);
app.use("/api/", authRouter);

app.get("/", (req, res) => {
	res.status(200).send("Yeah!!!");
});

connectDB();

server.listen("8080", () => {
	console.log("listening to server 8080");
});
