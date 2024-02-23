const dotenv = require("dotenv");
const bcrypt = require("bcrypt");

dotenv.config();

module.exports = {
	PORT: process.env.PORT,
	JWT_KEY: process.env.JWT_KEY,
	DB_NAME: process.env.DB_NAME,
	DB_PASSWORD: process.env.DB_PASSWORD,
	SALT: bcrypt.genSaltSync(10),
};
