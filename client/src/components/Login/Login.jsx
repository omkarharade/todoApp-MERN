import React, { useState } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import axios from "axios";
import InputArea from "../../utils/InputArea";
import Button from "../../utils/Button";
import Signup from "../Signup/Signup";
import "../../assets/BasicStyles.css";
import "./Login.css";

function Login() {
	const navigate = useNavigate();
	const [emailInput, setEmailInput] = useState("email@host.com");
	const [passwordInput, setPasswordInput] = useState("");

	const [emailValError, setEmailValError] = useState("");
	const [passwordValError, setPasswordValError] = useState("");

	function _validateEmail(email) {
		let regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

		if (regex.test(email) && email !== "") return true;
		else return false;
	}

	function _validatePassword(password) {
		let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/;

		if (regex.test(password)) return true;
		else return false;
	}

	const onLogin = async (e) => {
		e.preventDefault();

		const email = emailInput;
		const password = passwordInput;

		const emailIsValid = _validateEmail(email);
		const passwordIsValid = _validatePassword(password);

		if (!emailIsValid) {
			setEmailValError("invalid email please try again");
		}
		if (!passwordIsValid) {
			setPasswordValError("weak password, please try again");
		}

		if (emailIsValid && passwordIsValid) {
			await axios
				.post("http://localhost:5000/api/v1/login", { email, password })
				.then((response) => {
					const token = response.data.data;
					localStorage.removeItem("access");
					localStorage.setItem("access", token);
					navigate("/my-list");
				});
		}
	};

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
		<div className=" my-15 card login-div px-20 py-8 rounded-xl">
			<div className="input-header">
				<h2 className="text-2xl">Login </h2>
				<p>
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
				<Button
					className="w-75 enter-credentials-btn"
					name="Login"
					onClick={onLogin}
				/>
			</div>
		</div>
	);
}

export default Login;
