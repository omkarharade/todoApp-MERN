import React, { useState } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import axios from "axios";
import InputArea from "../../utils/InputArea";
import Button from "../../utils/Button";
import "../../assets/BasicStyles.css";
import "./Signup.css";
import Login from "../Login/Login";

function Signup() {
	const navigate = useNavigate();

	const [emailInput, setEmailInput] = useState("email@host.com");
	const [passwordInput, setPasswordInput] = useState("");

	const [emailValError, setEmailValError] = useState("");
	const [passwordValError, setPasswordValError] = useState("");

	function _validateEmail(email) {
		let regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

		if (regex.test(email) || email === "") return true;
		else return false;
	}

	function _validatePassword(password) {
		let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/;

		if (regex.test(password)) return true;
		else return false;
	}

	function handleEmailInputChange(email) {
		setEmailInput(email);

		if (_validateEmail(email)) {
			setEmailValError("");
		} else {
			setEmailValError("enter valid email");
		}
	}

	function handlePasswordInputChange(password) {
		setPasswordInput(password);

		if (_validatePassword(password)) {
			setPasswordValError("");
		} else {
			setPasswordValError(
				"Enter Password with atleast one uppercase, one lowercase letter, one digit, one special character and length atleast 8 digits"
			);
		}
	}

	const onSignup = async (e) => {
		e.preventDefault();
		alert("button clicked");

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
				.post("http://localhost:5000/api/v1/signup", { email, password })
				.then((response) => {
					console.log(response.data);
					navigate("/my-list");
				});
		}
	};

	return (
		<div className=" card signup-div px-20 py-8 rounded-xl">
			<div className="input-header">
				<h2 className="text-2xl">Signup </h2>
				<p>
					or{" "}
					<Link to="/login" className="blue-highlight">
						{" "}
						login to your account
					</Link>
				</p>
			</div>

			<Routes>
				<Route path="/login" element={<Login />} />
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
					name="Sign Up"
					onClick={onSignup}
				/>
			</div>
		</div>
	);
}

export default Signup;
