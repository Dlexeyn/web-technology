// to do
const {storage} = require("../models/storage");
const jwt = require("jsonwebtoken");
const config = require("../config/dbConfig.json");

module.exports.validator = new class {
  async signup(body) {
    const oldUser = await storage.findUserByLogin(body.email);
    if (oldUser) {
      throw new Error("Failed! Email is already in use!");
    }

    const user = await storage.create({
        email: body.email,
        name: body.name,
        lastName: body.lastName,
        password: body.password
      });
      if (user){
        return { message: "User registered successfully!" };
      }
      else throw new Error("User registered failed!");
  }

  async signin(body) {
    const userPass = await storage.findPassByLogin(body.username.toString());
    const user = await storage.findUserByLogin(body.username.toString());

    if (!userPass || !user) {
      throw new Error("User Not found.");
    }

    const passwordIsValid = body.password.toString()
        === userPass.password.toString();

    if (!passwordIsValid) {
      throw new Error("Invalid Password!");
    }

    return user;
  }
}

