import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { SALT, JWT_SECRET_STRING } from "../config/serverConfig.js";

const userSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

userSchema.pre("save", function (next) {
	console.log("in presave");
	console.log("this", this);
	const user = this;
	const encryptedPassword = bcrypt.hashSync(user.password, SALT);

	console.log("in-encrypted password", encryptedPassword);
	user.password = encryptedPassword;

	console.log("user", user);
	next();
});

userSchema.methods.comparePassword = function compare(password) {
	return bcrypt.compareSync(password, this.password);
};

userSchema.methods.genJWT = function generate() {
	return jwt.sign({ id: this._id, email: this.email }, JWT_SECRET_STRING, {
		expiresIn: "1h",
	});
};

const User = mongoose.model("User", userSchema);

export default User;
