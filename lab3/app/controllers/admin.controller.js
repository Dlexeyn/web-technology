
const config = require("../config/dbConfig.json");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const {storage} = require("../models/storage.js");
const {validator} = require("../middleware/validator");

const CLIENT_API = "http://localhost:8081/";

exports.friends = async (req, res) => {
	try {
		const name = await storage.getNames(req.params.id);
		const data = await storage.getFriends(req.params.id);
		res.render('users', {data: data, title: 'Друзья (' + name.name + ' ' + name.lastName + ')',
			backItem: {
				label: 'Назад',
				href: '/api/admin/getAll'
			}
		});
	} catch (e){
		res.status(500).json(e);
	}
}

exports.getAllUsers = async (req, res) => {
	try {
		const data = storage.getUsers();
		res.render('users', {data: data, title: 'Список пользователей',
			backItem: {
				label: 'Назад',
				href: CLIENT_API + 'postComp/'
			}});
	} catch (error) {
		res.status(500).send({ message: error.message });
	}

}

exports.set = async (req, res) => {
	try {
		const status = await storage.update(req.body);
		res.json({status: status});
	} catch (e){
		res.status(500).json(e);
	}
}

exports.update = async (req, res) => {
	try {
		const status = await storage.updateAll(req.body);
		res.json({status: status});
	} catch (e){
		res.status(500).json(e);
	}
}