

const {validator} = require("../middleware/validator");
const {storage} = require("../models/storage");

const CLIENT_API = "http://localhost:8081/";
exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.update = async (req, res) => {
  try {
    const status = await storage.updateAll(req.body);
    res.json({status: status});
  } catch (e){
    res.status(500).json(e);
  }
}

exports.deletePost = async (req, res) => {
  try {
    if(!req.body.id || !req.body.authorID){
      return res.status(200).send({
        status: 'Id is not valid!'
      });
    }

    await storage.deletePost(Number(req.body.id), Number(req.body.authorID));
    return res.status(200).send({
      status: 'OK'
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

exports.getPosts = async (req, res) => {
  try {
    const posts = await storage.getFormattedNews(req.params.id);
    return res.status(200).send({
      data: posts
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

exports.getUserProfile = async (req, res) => {
  try {
    const user = await storage.getUser(req.params.id);

    let roleOption = 'disable';
    if(user.role === "администратор")
      roleOption = 'enable';

    res.render('user', { backHref: CLIENT_API + "postComp", data : user, title : user.id, roleOption});
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.post = async (req, res) => {
  try {
    const status = await storage.createPost(req.body);
    return res.status(200).send({
      status: status
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}


exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};
