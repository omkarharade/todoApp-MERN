import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./List.css";

function List() {
	const navigate = useNavigate();
	const [todolist, setTodoList] = useState([]);

	useEffect(() => {
		fetchList();
	}, []);

	const fetchList = async () => {
		try {
			const response = await axios.get("http://localhost:5000/api/v1/items", {
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + localStorage.getItem("access"),
				},
			});
			console.log("res data : ", response);
			console.log("data : ", response.data);
			console.log("list data : ", response.data.data);

			if (response.data.success) {
				const listData = response.data.data;
				setTodoList(listData);
			}

			console.log("todolist", todolist);
		} catch (error) {
			console.log("error fetching the data", error);
			navigate("/login");
		}
	};

	const updateTaskStatus = (task) => {
		console.log("task.completed", task.completed);
		console.log("task.title", task.title);
	};

	const deleteTask = async (taskId) => {
		await axios.delete(`http://localhost:5000/api/v1/items/${taskId}`, {
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + localStorage.getItem("access"),
			},
		});

		const response = await axios.get("http://localhost:5000/api/v1/items", {
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + localStorage.getItem("access"),
			},
		});

		if (response.data.success) {
			const listData = response.data.data;
			setTodoList(listData);
		} else {
			alert("Error occured while deleting the task");
		}
	};

	return (
		<div className="flex justify-center items-center my-10">
			<div className="todo-div">
				<ul className="flex flex-row flex-wrap items-stretch ">
					{todolist.map((task) => {
						return (
							<div className=" task-div card">
								<li className="  py-3 px-5" key={task._id}>
									<p className="task-title"> {task.title}</p>

									<div className="flex flex-row my-5">
										<p
											onClick={() => {
												updateTaskStatus(task);
											}}
											className="task-status border-2"
										>
											{task.completed ? "Complete" : "Pending"}
										</p>
										<p className="mx-6 my-2">
											<i
												onClick={() => {
													deleteTask(task._id);
												}}
												class=" fa-solid fa-trash fa-xl  table-button delete-button text-red-500 hover:text-red-800"
											></i>
										</p>
									</div>
								</li>
							</div>
						);
					})}

					<li className="py-3 px-5 task-div card">
						<i class="fa-solid fa-square-plus fa-4x text-green-800 hover:text-green-600"></i>
					</li>
				</ul>
			</div>
		</div>
	);
}

export default List;
