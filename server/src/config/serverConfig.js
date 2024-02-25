import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();

const PORT = process.env.PORT;
const DB_NAME = process.env.DB_NAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const JWT_SECRET_STRING = process.env.JWT_SECRET_STRING;
const SALT = bcrypt.genSaltSync(10);

export { PORT, DB_NAME, DB_PASSWORD, SALT, JWT_SECRET_STRING };
