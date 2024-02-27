import React from "react";
import "./InputArea.css";

function InputArea(props) {
	function handleChange(e) {
		props.onInputChange(e.target.value);
		console.log(props);
	}

	return (
		<div>
			<input
				className="input-area"
				type={props.type}
				value={props.inputValue}
				onChange={handleChange}
			/>
		</div>
	);
}

export default InputArea;
