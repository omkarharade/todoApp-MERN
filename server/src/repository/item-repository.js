import TodoItem from "../models/item.js";
import CrudRepository from "./crud-repository.js";

class ItemRepository extends CrudRepository {
	constructor() {
		super(TodoItem);
	}

	async getAll(userId) {
		try {
			const result = await TodoItem.find({ userId: userId });
			return result;
		} catch (error) {
			console.log("Something went wrong in the item-repository");
			throw error;
		}
	}
}

export default ItemRepository;
