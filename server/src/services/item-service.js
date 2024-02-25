import ItemRepository from "../repository/item-repository.js";

class ItemService {
	constructor() {
		this.itemRepository = new ItemRepository();
	}

	async create(data) {
		try {
			console.log(data);
			const user = await this.itemRepository.create(data);
			return user;
		} catch (error) {
			throw error;
		}
	}

	async getAll(userId) {
		try {
			const todoItems = await this.itemRepository.getAll(userId);
			return todoItems;
		} catch (error) {
			throw error;
		}
	}

	async update(data) {
		try {
			console.log(data);
			const user = await this.itemRepository.update(itemId, data);
			return user;
		} catch (error) {
			throw error;
		}
	}

	async destroy(id) {
		try {
			const response = await this.itemRepository.destroy(id);
			return response;
		} catch (error) {
			console.log(error);
		}
	}
}

export default ItemService;
