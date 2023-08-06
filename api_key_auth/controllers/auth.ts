import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { envs } from "../config/dotenv";
import { generateRefreshToken, generateToken } from "../helpers/accessTokens";

export const refreshToken = (req: Request, res: Response) => {
	const token = req.header("x-refresh-token");
	const { _id, firstName, lastName, email } = req.body;

	if (!token) {
		return res.status(401).json({
			success: false,
			message: "Unauthorized. Authorization token needed for this action",
		});
	}

	if (!(_id && firstName && lastName && email)) {
		return res.status(400).json({
			success: false,
			message: "Bad request. User data required",
		});
	}

	return jwt.verify(token, envs.REFRESHTOKENSECRET, (err, data) => {
		if (err) {
			return res.status(403).json({
				success: false,
				message: "Forbidden. Refresh token is inalid",
				error: err.message,
			});
		}

		const accessToken = generateToken({ _id, firstName, lastName, email });
		const refreshToken = generateRefreshToken({ _id });

		return res.status(200).json({
			success: true,
			message: "Refresh token generated successfully!",
			accessToken,
			refreshToken,
		});
	});
};
