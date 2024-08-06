import { Request, Response } from "express";
import Task from "../models/taskModel";

export const fetchTasks = async (req: Request, res: Response) => {
	try {
		const { _id } = req.body.payload;
		const tasks = await Task.find({ userId: _id });

		return res.status(200).json({
			success: true,
			message: "Fetched Tasks successfully",
			data: tasks,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Server Error. Something went wrong",
			error,
		});
	}
};

export const fetchTaskById = async (req: Request, res: Response) => {
	try {
		const taskId = req.params.id;
		const { _id } = req.body.payload;
		const task = await Task.findById(taskId);

		if (!task)
			res
				.status(404)
				.json({ success: false, message: "Not Found. The task was not found" });

		if (task?.userId !== _id)
			return res.status(403).json({
				success: false,
				message: "Forbidden. You are not authorized to access this record.",
			});

		return res.status(200).json({
			success: true,
			message: "Task fetched successfully",
			data: task,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Server Error. Something went wrong",
			error,
		});
	}
};

export const fetchTasksByCategory = async (req: Request, res: Response) => {
	try {
		const category = req.params.category;
		const { _id } = req.body.payload;
		const tasks = await Task.find({ category, userId: _id });

		return res.status(200).json({
			success: true,
			message: "Tasks fetched successfully",
			data: tasks,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Server Error. Something went wrong",
			error,
		});
	}
};

export const createTask = async (req: Request, res: Response) => {
	try {
		const {
			title,
			category,
			description,
			payload: { _id },
		} = req.body;

		if (
			!title ||
			(category && typeof category !== "string") ||
			(description && typeof description !== "string")
		)
			return res.status(400).json({
				success: false,
				message: "Bad Request. Invalid fields passed",
			});

		const exististingTask = await Task.findOne({ title });

		if (exististingTask)
			return res.status(400).json({
				success: false,
				message: "Bad Request. A task with the same title already exist.",
			});

		const task = new Task({
			title,
			category,
			description,
			userId: _id,
			createdAt: new Date(),
			updatedAt: new Date(),
		});

		const data = await task.save();

		return res.status(201).json({
			success: true,
			message: "Created task successfully",
			data,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Server Error. Something went wrong",
			error,
		});
	}
};

export const updateTask = async (req: Request, res: Response) => {
	try {
		const taskId = req.params.id;
		const {
			title,
			category,
			description,
			payload: { _id },
		} = req.body;

		if (
			(title && typeof title !== "string") ||
			(category && typeof category !== "string") ||
			(description && typeof description !== "string")
		)
			return res.status(400).json({
				success: false,
				message: "Bad Request. Invalid fields passed",
			});

		const existingTask = await Task.findById(taskId);

		if (!existingTask)
			return res.status(404).json({
				success: false,
				message: "Not Found. Task you are trying to update does not exist",
			});
		if (existingTask.userId !== _id)
			return res.status(403).json({
				success: false,
				message: "Forbidden. You are not authorized to access this record",
			});

		const task = await Task.findByIdAndUpdate(
			taskId,
			{
				title: title ?? existingTask.title,
				category: category ?? existingTask.category,
				description: description ?? existingTask.description,
				updatedAt: new Date(),
			},
			{ new: true }
		);

		return res.status(200).json({
			success: true,
			message: "Updated task successfully",
			data: task,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Server Error. Something went wrong",
			error,
		});
	}
};

export const deleteTask = async (req: Request, res: Response) => {
	try {
		const taskId = req.params.id;
		const { _id } = req.body.payload;

		const existingTask = await Task.findById(taskId);

		if (!existingTask)
			return res.status(404).json({
				success: false,
				message: "Not Found. Task you are trying to update does not exist",
			});
		if (existingTask.userId !== _id)
			return res.status(403).json({
				success: false,
				message: "Forbidden. You are not authorized to access this record",
			});

		await Task.findByIdAndDelete(taskId);

		return res.status(200).json({
			success: true,
			message: "Deleted task successfully",
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Server Error. Something went wrong",
			error,
		});
	}
};
