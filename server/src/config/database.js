import mongoose from "mongoose";
import { DB_NAME, DB_PASSWORD } from "./serverConfig";

export const connect = async () => {
	mongoose.connect(
		`mongodb+srv://admin-omkar:${DB_PASSWORD}@cluster0.ytoxl.mongodb.net/${DB_NAME}`,
		{
			useUnifiedTopology: true,
			useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: false,
		}
	);
};
