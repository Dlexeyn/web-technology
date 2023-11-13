const config = require("../config/dbConfig.json");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const {storage} = require("../models/storage.js");
const {validator} = require("../middleware/validator");


exports.signup = async (req, res) => {
  try {
    const message = await validator.signup(req.body);
    res.status(200).send(message);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.signin = async (req, res) => {
  try {

    const user = await validator.signin(req.body);

    req.session.token = jwt.sign({id: user.id},
        config.secret,
        {
          algorithm: 'HS256',
          allowInsecureKeySizes: true,
          expiresIn: 86400, // 24 hours
        });

    return res.status(200).send({
      id: user.id,
      username: user.name,
      email: user.mail,
      role: user.role,
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

exports.signout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({
      message: "You've been signed out!"
    });
  } catch (err) {
    this.next(err);
  }
};