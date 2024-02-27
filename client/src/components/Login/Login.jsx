import React, { useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import InputArea from "../../utils/InputArea";
import Button from "../../utils/Button";
import Signup from "../Signup/Signup";
import "../../assets/BasicStyles.css";
import "./Login.css";

function Login() {
	const [emailInput, setEmailInput] = useState("email@host.com");
	const [passwordInput, setPasswordInput] = useState("");

	const [emailValError, setEmailValError] = useState("");
	const [passwordValError, setPasswordValError] = useState("");

	function handleEmailInputChange(email) {
		setEmailInput(email);

		let regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

		if (regex.test(email)) {
			setEmailValError("");
		} else {
			setEmailValError("enter valid email");
		}
	}

	function handlePasswordInputChange(password) {
		setPasswordInput(password);

		if (password.length >= 8) {
			setPasswordValError("");
		} else {
			setPasswordValError("Password minimum length:3");
		}
	}

	return (
		<div className="login-div px-20 py-8 rounded-xl">
			<div className="input-header text-2xl">
				<h2>Login </h2>
				<p className="text-xl">
					or{" "}
					<Link to="/signup" className="blue-highlight">
						create a new account
					</Link>
				</p>
			</div>

			<Routes>
				<Route path="/signup" element={<Signup />} />
			</Routes>

			<div className="input-field">
				<label>Email</label>
				<InputArea
					type={"text"}
					inputValue={emailInput}
					onInputChange={handleEmailInputChange}
				/>
				<p style={{ color: "red" }}>{emailValError}</p>
			</div>

			<div className="input-field">
				<label>Password</label>
				<InputArea
					type={"password"}
					inputValue={passwordInput}
					onInputChange={handlePasswordInputChange}
				/>
				<p style={{ color: "red" }}>{passwordValError}</p>
			</div>

			<div className="input-field">
				<Button className="w-75 enter-credentials-btn" name="Login" />
			</div>
		</div>
	);
}

export default Login;
