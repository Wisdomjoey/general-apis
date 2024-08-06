import mongoose from "mongoose";

mongoose.Promise = global.Promise;

const taskSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	userId: String,
	description: String,
	category: String,
	completed: {
		type: Boolean,
		default: false,
	},
	createdAt: Date,
	updatedAt: Date,
});

export default mongoose.model("Task", taskSchema);
