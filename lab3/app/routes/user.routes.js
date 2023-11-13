const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/user/:id([0-9]{1,})", [authJwt.verifyToken],
    controller.getUserProfile
  );

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );

  app.post('/api/user/update', controller.update);

  app.post("/api/user/post", controller.post);

  app.get("/api/user/getPosts/:id", controller.getPosts);

  app.post("/api/user/deletePost/", controller.deletePost)
};
