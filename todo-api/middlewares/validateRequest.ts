import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/dotenv";

export const validateRequest = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const auth = req.header("Authorization");

		if (!auth)
			return res.status(401).json({
				success: false,
				message: "Unauthorized. Authorization token needed for this action",
			});

		const token = auth.split(" ")[1] ?? "";

		return jwt.verify(token, JWT_SECRET ?? "", (err, payload) => {
			if (err)
				return res.status(403).json({
					success: false,
					message: "Forbidden. Token provided is invalid",
				});

			req.body.payload = payload;
			next();
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Server Error. Something went wrong",
			error,
		});
	}
};
