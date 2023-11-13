const fs = require("fs");

const config = require("../configs/config.json");

let placeArray = [];

module.exports.Store = new class {

	constructor() {
		this.data = fs.readFileSync(config.db, "utf8");
		this.books = JSON.parse(this.data);
		this.placeArray = []
		this.placeArray = new Array(this.books.length).fill(0);
		this.books.forEach(book =>{
			this.placeArray[book.id - 1] = 1;
		})
	}

	find(key){
		const regex = new RegExp(key, 'gi');
		return this.books.filter(book => {
			const author = book.author;
			const title = book.title;
			return regex.test(title) || regex.test(author);
		});
	}
	
	async create(book){
		book.id = this.findFreeId(this.books);
		this.books.push(book);
		await this.writeToDisk();
		return book;
	}
	
	async update(id, item){
		let book = await this.getOneBook(id);
		if(!book){
			throw new Error("Book not found!")
		}
		book.author = item.author;
		book.title = item.title;
		book.date = item.date;
		book.edition_year = item.edition_year;
		book.inStock = item.inStock;
		if(book.inStock === 'false')
			book.userName = item.userName;
		else
			book.userName = '';
		await this.writeToDisk();
		return book;
	}

	async deleteById(id){
		let index = await this.findById(Number(id), this.books);
		if(index !== -1){
			this.books.splice(index, 1);
			placeArray[index] = 0;
			await this.writeToDisk();
		}
		return this.books;
	}

	getBooks(){
		return this.books;
	}

	getOneBook(id){
		let book = null;
		for (let i = 0; i < this.books.length; i++) {
			if ('' + this.books[i].id === id) {
				book = this.books[i];
				break;
			}
		}
		return book;
	}

	async findById(id) {
		for(let i = 0; i < this.books.length; i++){
			if(this.books[i].id === id){
				return i;
			}
		}
		return -1;
	}

	filterByDate(date, data){
		let res = []

		let returnDate = new Date(date);

		data.forEach((book) => {

			let curDate = new Date(book.date);

			if(curDate <= returnDate){
				res.push(book);
			}

		})

		return res;
	}

	filterByStock(inStock, data){
		let res = [];

		data.forEach((book) => {
			if(book.inStock === inStock)
				res.push(book);
		})
		return res;
	}

	findFreeId(){
		for(let i = 0; i < this.placeArray.length; i++){
			if (this.placeArray[i] === 0)
				return i + 1;
		}

		this.placeArray.push(1);
		return this.placeArray.length;
	}

	async writeToDisk(){
		fs.writeFile(config.db, JSON.stringify(this.books, null, 4), (err) => {
			if (err) {
				console.error(err);
				return;
			}
			console.log("File has been created");
		});
	}

	async takeBook(id, name, date) {
		let book = await this.getOneBook(id);
		book.inStock = false;
		book.date = date;
		book.userName = name;
		await this.writeToDisk();
		return book;
	}

	async returnBook(id) {
		let book = await this.getOneBook(id);
		book.inStock = true;
		book.date = '';
		book.userName = '';
		await this.writeToDisk();
		return book;
	}
}