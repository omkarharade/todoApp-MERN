const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	completed: {
		type: Boolean,
		default: false,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	updatedAt: {
		type: Date,
		default: Date.now,
	},
});

const TodoItem = mongoose.model("TodoItem", ItemSchema);

export default TodoItem;
