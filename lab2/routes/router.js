const express = require("express");
const bodyParser = require('body-parser')
const {Controller} = require("../controllers/Controller");
const router = express.Router();

router.use(bodyParser.json());

router.post("/books/post", Controller.create);
router.post('/books/search', Controller.search);
router.post('/books/take/:id([0-9]{1,})', Controller.take);
router.post('/books/return/:id([0-9]{1,})', Controller.getBack);

router.get('/', Controller.login);
router.get('/books/:id([0-9]{1,})', Controller.getOne);
router.get('/books/new-book', Controller.getCreatePage);
router.get('/books/', Controller.getAll);
router.get('/books/search/', Controller.searchPage);
router.get('/books/edit/:id([0-9]{1,})', Controller.editPage);

router.delete("/books/delete/:id", Controller.delete);

router.put("/books/:id([0-9]{1,})", Controller.update);

router.get('/books/*', (req, res) => {
	res.status(404);
	res.send('No such book.')
})
router.get('*', (req, res) => {
	res.status(404);
	res.send('Page not found.')
})

module.exports = router;