import mongoose from "mongoose";
import { DB_NAME, DB_PASSWORD } from "./serverConfig.js";

const mongooseConnection = "mongodb://127.0.0.1:27017/todo_Dev";
// "mongodb+srv://admin-omkar:Omkar@1301@cluster0.ytoxl.mongodb.net/todolistDB";

export const connect = async () => {
	await mongoose.connect(mongooseConnection);
};
