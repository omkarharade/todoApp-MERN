import React, { useState } from "react";
import "./AddTask.css";
import Button from "../../utils/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddTask() {
	const [newTask, setNewTask] = useState("");
	const navigate = useNavigate();

	function handleChange(e) {
		setNewTask(e.target.value);
	}

	function returnList() {
		navigate("/my-list");
	}

	async function submitNewTask() {
		const title = newTask;

		await axios.post(
			`http://localhost:5000/api/v1/items/`,
			{ title: newTask },
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + localStorage.getItem("access"),
				},
			}
		);

		// setting newTaskData from List.jsx to empty string (refresh)
		navigate("/my-list");
	}

	return (
		<div className=" my-15 card login-div px-20 py-8 rounded-xl flex flex-col">
			<p className="py-2 text-xl flex justify-center ">Add New Task</p>
			<textarea
				className="task-input-field my-5"
				type="text"
				value={newTask}
				onChange={handleChange}
			/>

			<div className="flex flex-row">
				<Button
					name={"Add Task"}
					className={"login-btn"}
					onClick={submitNewTask}
				/>
				<i
					onClick={returnList}
					class=" py-1 fa-solid fa-circle-xmark fa-3x text-red-600 hover:text-red-700"
				></i>
			</div>
		</div>
	);
}

export default AddTask;
