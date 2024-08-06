import mongoose from "mongoose";
import { MONGO_URI } from "./dotenv";

export const connectDB = async () => {
	console.log("connecting to mongodb...");

	const client = mongoose.connection;

	try {
		client.on(
			"error",
			console.error.bind(
				console,
				"connection error. Failed to connect to mongodb"
			)
		);
		client.once("open", () => console.log("mongodb connected successfully"));

		await mongoose.connect(MONGO_URI ?? "");
	} catch (error) {
		console.log(`an error occurred: ${error}`);
	} 
	
	// finally {
	// 	await client.close();

	// 	console.log("Connection closed");
	// }
};
