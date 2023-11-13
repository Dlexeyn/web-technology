const controller = require("../controllers/admin.controller");
const { authJwt } = require("../middleware");

module.exports = function(app) {
	app.use(function(req, res, next) {
		res.header(
			"Access-Control-Allow-Headers",
			"Origin, Content-Type, Accept"
		);
		next();
	});

	app.get("/api/admin/getAll",
		authJwt.verifyToken,
		authJwt.isAdmin,
		controller.getAllUsers);

	app.post("/api/admin/set",
		authJwt.verifyToken,
		authJwt.isAdmin,
		controller.set)

	app.post("/api/users/update",
		authJwt.verifyToken,
		authJwt.isAdmin,
		controller.update)

	app.get("/api/admin/friends/:id",
		authJwt.verifyToken,
		authJwt.isAdmin,
		controller.friends)
};