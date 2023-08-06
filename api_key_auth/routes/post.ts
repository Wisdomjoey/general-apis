import express from "express";
import verifyToken from "../middlewares/verifyToken";
import { createPost } from "../controllers/post";

const postRouter = express.Router();

postRouter.post("/create-post", verifyToken, createPost);

export default postRouter;
