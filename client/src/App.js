import "./App.css";
import Landing from "./components/Landing/Landing";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import List from "./components/ListView/List";
import AddTask from "./components/AddTaskView/AddTask";

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<Landing />} />
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<Signup />} />
				<Route path="/my-list" element={<List />} />
				<Route path="/add-task" element={<AddTask />} />
			</Routes>
		</div>
	);
}

export default App;
