import dotenv from "dotenv";

dotenv.config({ path: __dirname + "/.env" });

export const { MONGO_URI, JWT_SECRET } = process.env;
