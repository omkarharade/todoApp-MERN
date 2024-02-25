import React from "react";
import "./Landing.css";
import Button from "../../utils/Button";
import { useNavigate } from "react-router-dom";

function Landing() {
	const navigate = useNavigate();

	const handleLogin = () => {
		navigate("/login");
	};

	const handleSignup = () => {
		navigate("/signup");
	};

	return (
		<div className="landing-card">
			<h2 className="h2-medium-text">
				Organize your day with our todo list now
			</h2>
			<Button onClick={handleLogin} className="signup-btn" label="Login" />
			<Button onClick={handleSignup} className="login-btn" label="Signup" />
		</div>
	);
}

export default Landing;
