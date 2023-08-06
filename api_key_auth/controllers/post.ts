import { Request, Response } from "express";
import Post from "../models/post";

export const createPost = async (req: Request, res: Response) => {
	const { title, message } = req.body;

	if (!(title && message)) {
		return res.status(400).json({
			success: false,
			message: "Bad request. All fields are required",
		});
	}

	const post = new Post({
		title: title,
		message: message,
		created: Date.now(),
		updated: Date.now(),
	});

	return await post
		.save()
		.then((doc) => {
			return res.status(201).json({
				success: true,
				message: "Post created successfully!",
				post: doc,
			});
		})
		.catch((err) => {
			return res.status(500).json({
				success: false,
				message: "Server error. An error occurred, could not create post",
				error: err.message,
			});
		});
};
