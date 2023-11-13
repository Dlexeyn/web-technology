const app = require('../../server')
const assert = require("assert");
const fs = require("fs");
const path = require("path");
const request = require('supertest')

describe('Проверка аутентификации', () => {
	test('Корректные данные', async () => {
		const response = await request(app)
			.post('/api/auth/signin')
			.send({
				username: "ivanov@example.com",
				password: "12345678"
			})
		expect(response.statusCode).toEqual(200)
		expect(response.body.email).toEqual("ivanov@example.com");
	})
	test('Неверный пароль', async () => {
		const response = await request(app)
			.post('/api/auth/signin')
			.send({
				username: "ivanov@example.com",
				password: "1234568"
			})
		expect(response.statusCode).toEqual(500)
	})
	test('Несуществующий пользователь', async () => {
		const response = await request(app)
			.post('/api/auth/signin')
			.send({
				username: "NotExist@gmail.com",
				password: "12345678"
			})
		expect(response.statusCode).toEqual(500)
	})
});

describe('Проверка регистрации пользователя', () => {
	test('Регистрируем нового пользователя', async () => {
		const response = await request(app)
			.post('/api/auth/signup')
			.send({
				email: "jestTest@yandex.com",
				name: "jestName",
				lastName: "jestLastName",
				password: "12345678",
				confirmPassword: "12345678"
			})
		expect(response.statusCode).toEqual(200)
		expect(response.body).toHaveProperty('message')
	})
});

describe('Проверка ролей пользователей', () => {
	test('Входим как обычный пользователь', async () => {
		const respLogin = await request(app)
			.post('/api/auth/signin')
			.send({
				username: "ivanov@example.com",
				password: "12345678"
			})
		expect(respLogin.statusCode).toEqual(200)
		expect(respLogin.body.role).toEqual("пользователь");
	})
	test('Входим как обычный пользователь', async () => {
		const respLogin = await request(app)
			.post('/api/auth/signin')
			.send({
				username: "anna@example.com",
				password: "12345678"
			})
		expect(respLogin.statusCode).toEqual(200)
		expect(respLogin.body.role).toEqual("администратор");
	})
});