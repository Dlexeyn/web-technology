const {Store} = require("./store");

module.exports.PostService = new class {
	async create(post){
		return await Store.create(post);
	}

	async getAll(){
		return await Store.getBooks();
	}

	async findByKey(keyWord){
		if(!keyWord)
			throw new Error("Key word is not defined");
		const res = await Store.find(keyWord);
		if(res === undefined)
			return null;
		return res;
	}

	async findByFilters(filters){

		if(!this.checkFilters(filters))
			return this.getAll();

		const text = filters.text;
		const date = filters.date;
		const isStock = filters.isStock;
		let res = null;

		if(text){
			res = await this.findByKey(text);
			res = await this.findByDate(date, res);
			res = await this.findByStock(isStock, res);
		} else if(date){
			res = await this.findByDate(date, Store.books);
			res = await this.findByStock(isStock, res);
		} else{
			res = await this.findByStock(isStock, Store.books);
		}

		return res;
	}

	checkFilters(filters){
		return !(filters.text.length === 0 && filters.date.length === 0 &&
		filters.isStock === 'false');
	}

	async findByDate(date, data){
		let res = null;
		if(date.length !== 0){
			res = Store.filterByDate(date, data);
			return res;
		}
		return data;
	}

	async findByStock(isStock, data){
		let res = null;
		let inStockBool = isStock.toLowerCase() === 'true';
		if(inStockBool !== false)
		{
			res = Store.filterByStock(inStockBool, data);
			return res;
		}

		return data;
	}

	async getOne(id){
		if(!id)
			throw new Error("Id is not defined");
		const book = await Store.getOneBook(id);
		if(!book)
			throw new Error("Book not found");
		return book;
	}

	async find(key){

	}

	async delete(id){
		if(!id)
			throw new Error("Id is defined");
		return await Store.deleteById(id);
	}

	async update(post, id){
		if(!id)
			throw new Error("Id is defined");
		return await Store.update(id, post);
	}

	async getFromLibrary(post) {
		if(!post.id)
			throw new Error("Id is defined");
		if(!post.name || !post.date)
			throw new Error("Not all fields are set");
		return await Store.takeBook(post.id, post.name, post.date);
	}

	async returnToLibrary(id) {
		if(!id)
			throw new Error("Id is defined");
		return await Store.returnBook(id);
	}
}