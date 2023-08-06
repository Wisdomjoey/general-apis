import dotenv from "dotenv";

dotenv.config({ path: __dirname + "/.env" });

export const envs = {
  MONGO_URI: process.env.MONGO_URI!,
  ACCESSTOKENSECRET: process.env.ACCESSTOKENSECRET!,
  REFRESHTOKENSECRET: process.env.REFRESHTOKENSECRET!,
}
