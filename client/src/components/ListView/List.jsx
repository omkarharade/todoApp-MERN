import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./List.css";
import "../../assets/BasicStyles.css";
import InputArea from "../../utils/InputArea";

function List() {
	const navigate = useNavigate();
	const [todolist, setTodoList] = useState([]);
	const [pageNumber, setPageNumber] = useState(1);
	const [searchQuery, setSearchQuery] = useState("");
	const [paginateList, setPaginateList] = useState([]);
	const pageSize = 4;

	var currentList = [];
	const indexOfLastPost = pageNumber * pageSize;
	const indexOfFirstPost = indexOfLastPost - pageSize;

	currentList =
		searchQuery === ""
			? todolist.slice(indexOfFirstPost, indexOfLastPost)
			: paginateList.slice(indexOfFirstPost, indexOfLastPost);

	useEffect(() => {
		fetchList();
	}, []);

	const fetchListData = async () => {
		try {
			const response = await axios.get("http://localhost:5000/api/v1/items", {
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + localStorage.getItem("access"),
				},
			});

			if (response.data.success) {
				const listData = response.data.data;
				setTodoList(listData);
			}

			return response.data.success;
		} catch (error) {
			console.log("error fetching the dataconsole.log", error);
		}
	};

	const fetchList = async () => {
		// sending pagenumber and size as arguement for pagination of data

		const isListAvailable = await fetchListData();

		if (!isListAvailable) {
			console.log("error fetching the data");
			navigate("/login");
		}

		setPaginateList(todolist);
	};

	const updateTaskStatus = async (task) => {
		await axios.patch(
			`http://localhost:5000/api/v1/items/${task._id}`,
			{ completed: !task.completed },
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + localStorage.getItem("access"),
				},
			}
		);

		const isListAvailable = await fetchListData();

		if (!isListAvailable) {
			alert("Error occured while deleting the task");
		}
	};

	const deleteTask = async (taskId) => {
		await axios.delete(`http://localhost:5000/api/v1/items/${taskId}`, {
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + localStorage.getItem("access"),
			},
		});

		const isListAvailable = await fetchListData();

		if (!isListAvailable) {
			alert("Error occured while deleting the task");
		}
	};

	function openTaskForm() {
		navigate("/add-task");
	}

	function descPageCount() {
		if (pageNumber == 1) return;
		setPageNumber(pageNumber - 1);
	}

	function incrPageCount() {
		setPageNumber(pageNumber + 1);
	}

	function searchTask(query) {
		setSearchQuery(query);

		let searchResults = todolist.filter((task) => {
			if (task.title.startsWith(query)) {
				return true;
			} else return false;
		});

		setPaginateList(searchResults);
		console.log("search-result", searchResults);
	}

	return (
		<>
			<div className="flex justify-center items-center my-10 flex-col">
				<div className="flex flex-row mb-10">
					<i className="py-8 rounded-full px-5 bg-white fa-solid fa-lg fa-magnifying-glass"></i>
					<InputArea
						type={"text"}
						inputValue={searchQuery}
						onInputChange={searchTask}
					/>
				</div>
				<div className="todo-div">
					<ul className="flex flex-row flex-wrap items-stretch ">
						{currentList.map((task) => {
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
							<i
								onClick={openTaskForm}
								class="fa-solid fa-square-plus fa-4x text-green-800 hover:text-green-600"
							></i>
						</li>
					</ul>
				</div>

				<div className=" py-5 px-5 bg-white my-10 card flex flex-row ">
					<i
						onClick={descPageCount}
						className=" bg-blue-500 text-white rounded-lg p-4 fa-solid fa-arrow-left"
					></i>
					<p className=" bg-blue-500 text-white rounded-full p-4 mx-10">
						{pageNumber}
					</p>
					<i
						onClick={incrPageCount}
						className=" bg-blue-500 text-white rounded-lg p-4 fa-solid fa-arrow-right"
					></i>
				</div>
			</div>
		</>
	);
}

export default List;
