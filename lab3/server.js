const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const lessMiddleware = require('less-middleware');
const path = require("path");

const app = express();

// app.use(cors());
app.use(
    cors({
        credentials: true,
        origin: "http://localhost:8081",
    })
);

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(
    cookieSession({
        name: "bezkoder-session",
        keys: ["COOKIE_SECRET"], // should use as secret environment variable
        httpOnly: true,
        sameSite: 'strict'
    })
);

app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'pug');
app.use(lessMiddleware(path.join(__dirname, 'app/public')));
app.use(express.static(path.join(__dirname, 'app/public')));
// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to bezkoder application." });
});

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/admin.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

module.exports = app;