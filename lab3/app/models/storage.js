const fs = require("fs");
const config = require("../config/dbConfig.json");

module.exports.storage = new class{
	constructor() {
		this.data = fs.readFileSync(config.users, "utf8");
		this.friendsData = fs.readFileSync(config.friends, "utf8");
		this.newsData = fs.readFileSync(config.news, "utf8");
		this.passwordsData = fs.readFileSync(config.passwords, "utf8");

		this.users = JSON.parse(this.data);
		this.usersFriends = JSON.parse(this.friendsData);
		this.usersNews = JSON.parse(this.newsData);
		this.passwords = JSON.parse(this.passwordsData);

		this.placeArray = []
		this.placeArray = new Array(this.users.length).fill(0);
		this.users.forEach(user =>{
			this.placeArray[user.id - 1] = 1;
		});
	}

	getUsers(){
		return this.users;
	}

	async getUser(id){
		let user = null;
		for (let i = 0; i < this.users.length; i++) {
			if (Number(this.users[i].id) === Number(id)) {
				user = this.users[i];
				break;
			}
		}
		return user;
	}

	findFreeId(){
		for(let i = 0; i < this.placeArray.length; i++){
			if (this.placeArray[i] === 0)
				return i + 1;
		}

		this.placeArray.push(1);
		return this.placeArray.length;
	}

	async findById(id) {
		for(let i = 0; i < this.users.length; i++){
			if(this.users[i].id === id){
				return i;
			}
		}
		return -1;
	}

	async writeToDisk(){
		fs.writeFileSync(config.users, JSON.stringify(this.users, null, 4), (err) => {
			if (err) {
				console.error(err);
				return;
			}
			console.log("File has been saved");
		});
		fs.writeFileSync(config.passwords, JSON.stringify(this.passwords, null, 4), (err) => {
			if (err) {
				console.error(err);
				return;
			}
			console.log("File has been saved");
		});
		fs.writeFileSync(config.news, JSON.stringify(this.usersNews, null, 4), (err) => {
			if (err) {
				console.error(err);
				return;
			}
			console.log("File has been saved");
		});
		fs.writeFileSync(config.friends, JSON.stringify(this.usersFriends, null, 4), (err) => {
			if (err) {
				console.error(err);
				return;
			}
			console.log("File has been saved");
		});
	}

	async update(params) {
		const {id, type, value} = params;
		const user = await this.getUser(id);

		if(!user)
			return 'user not found';

		if(type === 'role')
			user.role = value;
		else if(type === 'status')
			user.status = value;

		return 'ok';
	}

	async updateAll(params) {
		const {id, name, lastName, middleName, mail,
			birthDate, status, role} = params;
		let user = await this.getUser(id);
		console.log(user.mail);
		let userPass = await this.findPassByLogin(user.mail);
		console.log(userPass);
		userPass.mail = mail;

		if(!user)
			throw new Error('User not found!');

		user.name = name;
		user.lastName = lastName;
		user.middleName = middleName;
		user.mail = mail;
		user.birthDate = birthDate;
		user.status = status;
		user.role = role;

		await this.writeToDisk();
		return 'ok';
	}

	async getFriends(id) {
		let friendsIDs = await this.getFriendsIds(id);
		let friends = [];
		console.log(friendsIDs);
		for(const friendID of friendsIDs){
			const user = await this.getUser(friendID);
			if(!user){
				throw new Error(`Friend with id: ${friendID} not found!`);
			}
			friends.push(user);
		}
		return friends;
	}

	async getFriendsIds(id){
		let friends = null;
		this.usersFriends.forEach((item) => {
			if(item.id === Number(id)){
				friends = [...item.friends];
			}
		});
		return friends;
	}

	async getNames(id) {
		const user = await this.getUser(id);
		if(!user){
			throw new Error('User not found!');
		}
		let names = {};
		names.name = user.name;
		names.lastName = user.lastName;

		return names;
	}

	async getFormattedNews(id) {
		let news = [];
		let friends  = await this.getFriendsIds(id);
		friends.push(Number(id));
		for(let friendId of friends){
			let username = await this.getNames(friendId);

			for (const item of this.usersNews) {

				if(Number(friendId) === Number(item.userID)){
					console.log("До")
					console.log(item);
					let friendPosts = await this.cloneNews(item.news, username, friendId);
					news.push(...friendPosts);
					console.log("После")
					console.log(item);
				}

			}

		}
		return news;
	}



	async cloneNews(newsItem, username, id){
		let itemClone = newsItem.map(a => ({...a}));
		let fullName = username.name + " " + username.lastName;
		for (let post of itemClone){
			post.author = fullName;
			post.authorID = id;
		}
		return itemClone;
	}

	async create(param) {
		let userPassword = {
			mail: param.email,
			password: param.password
		}
		this.passwords.push(userPassword);

		let user = {
			id: this.findFreeId(),
			mail: param.email,
			name: param.name,
			lastName: param.lastName
		}
		this.users.push(user);
		await this.writeToDisk();

		return user;
	}

	async findAll(param) {
		
	}

	async findPassByLogin(login) {
		let user = null;
		for (let i = 0; i < this.passwords.length; i++) {
			if (this.passwords[i].mail === login) {
				user = this.passwords[i];
				break;
			}
		}
		return user;
	}

	async findUserByLogin(login) {
		let user = null;
		for (let i = 0; i < this.users.length; i++) {
			if (this.users[i].mail === login) {
				user = this.users[i];
				break;
			}
		}
		return user;
	}

	async createPost(body) {
		let news = await this.getNews(body.id);

		console.log("Создаем");
		console.log(news);

		let id = await this.findFreeNewsId(news);
		let post = {
			id: id,
			content: body.content,
			date: body.date
		}

		news.push(post);
		console.log("Создано");
		console.log(news);
		await this.writeToDisk();

		return 'ok';
	}

	async deletePost(id, authorID) {
		let news;
		this.usersNews.forEach((item) => {
			if(authorID === Number(item.userID)){
				news = item.news;
			}
		})
		for (const newsKey in news) {
			if(Number(news[newsKey].id) === Number(id)){
				news.splice(newsKey, 1);
			}

		}
		await this.writeToDisk();
	}

	async getNews(id) {
		for (const item of this.usersNews){
			if(Number(id) === Number(item.userID)){
				return item.news;
			}
		}
	}

	async findFreeNewsId(news) {

		let count = 1;
		for (const key in news) {
			let obj = news.find(o => o.id === count);
			if(obj){
				count++;
			} else
				return count;
		}
		return count;
	}
}