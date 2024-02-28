import { ItemService } from "../services/index.js";

const itemService = new ItemService();

export const createItem = async (req, res) => {
	try {
		const response = await itemService.create({
			title: req.body.title,
			userId: req.user.id,
		});

		return res.status(201).json({
			success: true,
			message: "Successfully created a new todo-item",
			data: response,
			err: {},
		});
	} catch (err) {
		return res.status(500).json({
			message: "todo-item cannot be created",
			data: {},
			success: false,
			err: err,
		});
	}
};

export const getAllTodoItems = async (req, res) => {
	try {
		const response = await itemService.getAll(req.user.id);

		return res.status(201).json({
			success: true,
			message: "successfully fetched all todo-items",
			data: response,
			err: {},
		});
	} catch (err) {
		return res.status(500).json({
			message: "failed to fetch all todo-items",
			data: {},
			success: false,
			err: err,
		});
	}
};

export const getAllTodoPaginateItems = async (req, res) => {
	try {
		console.log("controller-query", req.query);
		const response = await itemService.getAllPaginated(req.user.id, req.query);

		return res.status(201).json({
			success: true,
			message: "successfully fetched all todo-items",
			data: response,
			err: {},
		});
	} catch (err) {
		return res.status(500).json({
			message: "failed to fetch all todo-items",
			data: {},
			success: false,
			err: err,
		});
	}
};

export const updateItem = async (req, res) => {
	try {
		console.log(req.params.id);
		const response = await itemService.update(req.params.id, {
			title: req.body.title,
			completed: req.body.completed,
		});

		return res.status(200).json({
			success: true,
			message: "todo-item updated successfully",
			data: response,
			err: {},
		});
	} catch (err) {
		return res.status(500).json({
			message: "todo-item cannot be updated",
			data: {},
			success: false,
			err: err,
		});
	}
};

export const deleteItem = async (req, res) => {
	try {
		const response = await itemService.destroy(req.params.id);

		return res.status(200).json({
			success: true,
			message: "todo-item deleted successfully",
			data: response,
			err: {},
		});
	} catch (err) {
		return res.status(500).json({
			message: "todo-item cannot be deleted",
			data: {},
			success: false,
			err: err,
		});
	}
};
