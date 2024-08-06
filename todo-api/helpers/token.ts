import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/dotenv";

export const generateToken = (data: any) => {
	return jwt.sign(data, JWT_SECRET ?? "somethingsecret", { expiresIn: "15m" });
};
