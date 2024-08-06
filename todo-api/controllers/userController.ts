import { Request, Response } from "express";
import User from "../models/userModel";
import { generateToken } from "../helpers/token";
import { generateHash, validateHash } from "../helpers/helpers";

export const login = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;

		if (
			!email ||
			!password ||
			typeof email !== "string" ||
			typeof password !== "string"
		)
			return res.status(400).json({
				success: false,
				message: "Bad Request. Invalid fields passed",
			});

		const user = await User.findOne({ email });

		if (!user)
			return res.status(404).json({
				success: false,
				message: "Bad Request. This email is not associated with any account.",
			});

		const isPwdValid = await validateHash(user.password, password);

		if (!isPwdValid)
			return res.status(400).json({
				success: false,
				message: "Bad Request. Invalid Credentials.",
			});

		const token = generateToken({
			_id: user._id,
			email: user.email,
			fullname: user.fullname,
		});

		res.setHeader("x-auth-token", token);

		return res
			.status(200)
			.json({ success: true, message: "Login Successfull" });
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Server Error. Something went wrong",
			error,
		});
	}
};

export const register = async (req: Request, res: Response) => {
	try {
		const { email, password, fullname } = req.body;

		if (
			!email ||
			!password ||
			!fullname ||
			typeof email !== "string" ||
			typeof password !== "string" ||
			typeof fullname !== "string"
		)
			return res.status(400).json({
				success: false,
				message: "Bad Request. Invalid fields passed",
			});

		const existingUser = await User.findOne({ email });

		if (existingUser)
			return res.status(404).json({
				success: false,
				message:
					"Bad Request. This email is already associated with a different account.",
			});

		const hash = await generateHash(password);
		const user = new User({ email, password: hash, fullname });

		await user.save();

		return res
			.status(201)
			.json({ success: true, message: "Registration Successfull" });
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Server Error. Something went wrong",
			error,
		});
	}
};
