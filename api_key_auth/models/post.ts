import mongoose from "mongoose";

mongoose.Promise = global.Promise;

const postSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	message: {
		type: String,
		required: true,
	},
	created: {
		type: Number,
		default: Date.now(),
	},
	updated: {
		type: Number,
		default: Date.now(),
	},
});

export default mongoose.model("Post", postSchema);
