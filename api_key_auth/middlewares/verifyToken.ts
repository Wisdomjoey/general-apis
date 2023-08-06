import { NextFunction, Request, Response } from "express";
import { envs } from "../config/dotenv";
import jwt from "jsonwebtoken";

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
	const authorization = req.header("Authorization");

	if (!authorization) {
		return res.status(401).json({
			success: false,
			message: "Unauthorized. Authorization token needed for this action",
		});
	}

	const token = authorization.split(" ")[1];
	return jwt.verify(token, envs.ACCESSTOKENSECRET, (err, user) => {
		if (err) {
			return res.status(403).json({
				success: false,
				message: "Forbidden. Token is invalid",
				error: err.message,
			});
		}

		req.body.user = user;
		next();
	});
};

export default verifyToken;
