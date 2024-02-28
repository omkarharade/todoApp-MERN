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
			console.log("Something went wrong in  item-repository");
			throw error;
		}
	}

	async getAllPaginated(userId, query) {
		try {
			const limit = query.size;
			const offset = (query.page - 1) * query.size;

			console.log("query", query);

			if (query.page == 0) throw "PAGE NUMBER INVALID TRY AGAIN";

			const result = await TodoItem.find({ userId: userId })
				.skip(offset)
				.limit(limit)
				.exec();
			return result;
		} catch (error) {
			console.log("error fetching paginated data in item-repository");
			throw error;
		}
	}
}

export default ItemRepository;
