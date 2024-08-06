import express from "express";
import {
	createTask,
	deleteTask,
	fetchTasksByCategory,
	fetchTaskById,
	fetchTasks,
	updateTask,
} from "../controllers/taskController";
import { validateRequest } from "../middlewares/validateRequest";

const taskRouter = express.Router();

taskRouter.get("/task", validateRequest, fetchTasks);
taskRouter.get("/task/:id", validateRequest, fetchTaskById);
taskRouter.get("/tasks/:category", validateRequest, fetchTasksByCategory);

taskRouter.post("/task/create", validateRequest, createTask);

taskRouter.patch("/task/update/:id", validateRequest, updateTask);

taskRouter.delete("/task/delete/:id", validateRequest, deleteTask);

export default taskRouter;
