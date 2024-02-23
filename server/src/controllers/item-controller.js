import { ItemService } from "../services";

const itemService = new ItemService();

export const createItem = async (req, res) => {
	try {
		const response = await itemService.create({
			title: req.body.title,
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

export const updateItem = async (req, res) => {
	try {
		const response = await itemService.update({
			itemId: req.body.itemId,

			data: {
				title: req.body.title,
				completed: req.body.completed,
			},
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
		const response = await itemService.destroy({
			id: req.body.itemId,
		});

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
