import jwt from "jsonwebtoken";
import { UserType } from "../controllers/user";
import { envs } from "../config/dotenv";

export const generateToken = (data: UserType) => {
	return jwt.sign(data, envs.ACCESSTOKENSECRET, {
		expiresIn: "15m",
	});
};

export const generateRefreshToken = (data: UserType) => {
	return jwt.sign(data, envs.REFRESHTOKENSECRET, {
		expiresIn: "5d",
	});
};
