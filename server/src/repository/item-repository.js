import TodoItem from "../models/item";
import CrudRepository from "./crud-repository";

class ItemRepository extends CrudRepository {
	constructor() {
		super(TodoItem);
	}

	async getAll(userId) {
		try {
			const result = await TodoItem.findById(id);
			return result;
		} catch (error) {
			console.log("Something went wrong in the item-repository");
			throw error;
		}
	}
}

export default ItemRepository;
