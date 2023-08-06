import User from "../models/user";
import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import { isEmailValid } from "../helpers/validation";
import { generateRefreshToken, generateToken } from "../helpers/accessTokens";
import { ObjectId } from "mongodb";

export type UserType = {
	_id: ObjectId;
	firstName?: string;
	lastName?: string;
	email?: string;
};

export const register = async (req: Request, res: Response) => {
	const { firstName, lastName, email, password } = req.body;

	if (!(firstName && lastName && email && password)) {
		res.status(400).json({
			success: false,
			message: "Bad request. All fields are required",
		});
		return;
	}

	if (!isEmailValid(email)) {
		res.status(400).json({
			success: false,
			message: "Bad request. Email address is invalid",
		});
		return;
	}

	const existingUser = await User.findOne({ email });

	if (existingUser) {
		res.status(400).json({
			success: false,
			message:
				"Bad request. This email address is already associated with a different account",
		});
		return;
	}

	const hashed = await bcrypt.hash(password, 10);

	const user = new User({
		firstName: firstName,
		lastName: lastName,
		email: email,
		password: hashed,
	});

	return await user
		.save()
		.then((doc) => {
			const { _id, firstName, lastName, email } = doc;

			return res.status(201).json({
				success: true,
				message: "User registered successfully",
				user: { _id, firstName, lastName, email },
			});
		})
		.catch((err) => {
			return res.status(500).json({
				success: false,
				message: "Server error. Could not complete registration",
				error: err.message,
			});
		});
};

export const login = async (req: Request, res: Response) => {
	const { email, password } = req.body;

	if (!(email && password)) {
		res.status(400).json({
			success: false,
			message: "Bad request. All fields are required",
		});
		return;
	}

	const user = await User.findOne({ email });

	if (!user) {
		res.status(400).json({
			success: false,
			message: "Bad request. Invalid credentials",
		});
		return;
	}

	const decrypted = await bcrypt.compare(password, user.password);
	const { _id, firstName, lastName } = user;

	if (decrypted) {
		const token = generateToken({ _id, firstName, lastName, email });
		const refreshToken = generateRefreshToken({ _id });

		return res.status(200).json({
			success: true,
			message: "Successfully logged in",
			user: { _id, firstName, lastName, email, token, refreshToken },
		});
	} else {
		return res.status(400).json({
			success: false,
			message: "Bad request. Invalid credentials",
		});
	}
};
