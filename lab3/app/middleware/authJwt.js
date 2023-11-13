const jwt = require("jsonwebtoken");
const config = require("../config/dbConfig.json");
const {storage} = require("../models/storage");

verifyToken = (req, res, next) => {
  let token = req.session.token;

  if (!token) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }

  jwt.verify(token,
      config.secret,
      (err, decoded) => {
        if (err) {
          return res.status(401).send({
            message: "Unauthorized!",
          });
        }
        req.userId = decoded.id;
        next();
      });
};

isAdmin = async (req, res, next) => {
  try {
    const user = await storage.getUser(req.userId);
    if(user.role === "администратор"){
      return next();
    }

    return res.status(403).send({
      message: "Require Admin Role!",
    });
  } catch (error) {
    return res.status(500).send({
      message: "Unable to validate User role!",
    });
  }
};


const authJwt = {
  verifyToken,
  isAdmin
};
module.exports = authJwt;