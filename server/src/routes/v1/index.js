import express from "express";

import { signup, login } from "../../controllers/auth-controller.js";
import { authenticate } from "../../middlewares/authenticate.js";
import {
	createItem,
	deleteItem,
	getAllTodoItems,
	getAllTodoPaginateItems,
	updateItem,
} from "../../controllers/item-controller.js";

const router = express.Router();

//auth
router.post("/signup", signup);
router.post("/login", login);

//todo-items

router.post("/items", authenticate, createItem);
router.patch("/items/:id", authenticate, updateItem);
router.get("/items", authenticate, getAllTodoItems);
router.delete("/items/:id", authenticate, deleteItem);

export default router;
