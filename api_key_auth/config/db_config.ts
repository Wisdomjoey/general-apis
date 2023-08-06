// import { MongoClient, ServerApiVersion } from "mongodb";
import { envs } from "./dotenv";
import mongoose from "mongoose";

// const client = new MongoClient(envs.MONGO_URI, {
// 	serverApi: {
// 		version: ServerApiVersion.v1,
// 		strict: true,
// 	},
// });

const connectDB = async () => {
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

		await mongoose.connect(envs.MONGO_URI);
	} catch (error) {
		console.log(`an error occurred: ${error}`);
	}
};

export { connectDB };
