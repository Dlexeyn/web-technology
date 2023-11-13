let express = require("express");
let server = express();
let router = require("./routes/router");
const config = require("./configs/config.json");

server.use('/public', express.static('public'));
server.set('views', './views');
server.set('view engine', 'pug');
server.use("/", router);

server.listen(config.port, () =>{
	console.log("Server started!");
})