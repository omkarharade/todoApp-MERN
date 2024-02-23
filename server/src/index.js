const express = require("express");
const bodyParser = require("body-parser");
const { PORT } = require("./config/serverConfig");
const apiRoutes = require("./routes/index");
import { connect } from "./config/database.js";
console.log(PORT);

const app = express();

const prepareAndStartServer = () => {
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));

	app.use("/api", apiRoutes);

	app.listen(PORT, async () => {
		console.log(`server started on port: ${PORT}`);
		await connect();
		console.log("Mongo db connected");
	});
};
