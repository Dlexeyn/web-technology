const {PostService} = require("../model/postService");

module.exports.Controller = new class {
	async create(req, res){
		try{
			const post = await PostService.create(req.body);
			return res.json({id : post.id});
		} catch (e) {
			res.status(500).json(e);
		}
	}

	async searchPage(req, res){
		try {
			res.render('search',{
				title: "Поиск"
			});
		} catch (e) {
			res.status(500).json(e);
		}
	}

	async search(req, res){
		try {
			const post = await PostService.findByFilters(req.body);
			return res.json(post);
		} catch (e) {
			res.status(500).json(e);
		}
	}

	async getCreatePage(req, res){
		try {
			res.render('newBook', {
				title: "Новая книга",
				data: null
			});
		} catch (e){
			res.status(500).json(e);
		}
	}

	async getAll(req, res){
		try {
			const posts = await PostService.getAll();
			res.render('catalog', {
				title: "Каталог книг",
				data: posts
			});
		} catch (e){
			res.status(500).json(e);
		}
	}

	async getOne(req, res){
		try {
			const post = await PostService.getOne(req.params.id);
			res.render('book', {
				title: 'Книга',
				item: post,
				button: ''
			})
		} catch (e){
			res.status(500).json(e);
		}
	}

	async delete(req, res){
		try {
			const posts = await PostService.delete(req.params.id);
			return res.json({redirect : `/books/`});
		} catch (e){
			res.status(500).json(e);
		}
	}

	async update(req, res){
		try {
			const updatedPost = await PostService.update(req.body, req.params.id);
			res.json({redirect : `/books/${updatedPost.id}`});
		} catch (e){
			res.status(500).json(e);
		}
	}

	async take(req, res) {
		try {
			const updatedPost = await PostService.getFromLibrary(req.body);
			res.json({redirect : `/books/${updatedPost.id}`});
		} catch (e){
			res.status(500).json(e);
		}
	}

	async getBack(req, res) {
		try {
			const updatedPost = await PostService.returnToLibrary(req.params.id);
			res.json({redirect : `/books/${updatedPost.id}`});
		} catch (e){
			res.status(500).json(e);
		}
	}

	async editPage(req, res) {
		try {
			const post = await PostService.getOne(req.params.id);
			res.render('edit', {
				title: 'Редактирование',
				item: post,
				button: ''
			})
		} catch (e){
			res.status(500).json(e);
		}
	}

	login(req, res) {
		try {
			res.render('login');
		} catch (e){
			res.status(500).json(e);
		}
	}
}