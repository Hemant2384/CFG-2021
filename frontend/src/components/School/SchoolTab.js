import React, { useEffect, useState, useContext } from "react";
import { Button, Card, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./School.css";
import axios from "axios";
import { navContext } from "../../App";

function FormTodo({ addTodo, schoolId }) {
	const [taskDes, setTaskDes] = useState("");
	const [taskType, setTaskType] = useState("");
	const [taskDate, setTaskDate] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!taskDes.length) return;
		if (!taskType.length) return;
		if (!taskDate.length) return;
		addTodo(taskDes);
		axios.post(`https://team-44-for-win.herokuapp.com/school/${schoolId}/add-requirement`, {
			requirement: taskDes,
			interest: taskType,
			date: taskDate,
		});
		setTaskDes("");
		setTaskType("");
		setTaskDate("");
	};

	return (
		<Form onSubmit={handleSubmit}>
			<Form.Group>
				<Form.Label>
					<b id="add">Requirements</b>
				</Form.Label>
				<Form.Control
					type="text"
					className="input"
					value={taskDes}
					onChange={(e) => setTaskDes(e.target.value)}
					placeholder="Enter your task"
					required
				/>
				<Form.Label>
					<b id="add">Enter type of task</b>
				</Form.Label>
				<Form.Control
					type="text"
					className="input"
					value={taskType}
					onChange={(e) => setTaskType(e.target.value)}
					placeholder="Enter type"
					required
				/>

				<br></br>
				<br></br>
				<label for="birthday" required id="bir">
					Date:
				</label>
				<input
					type="date"
					id="date"
					name="date"
					className="ta"
					value={taskDate}
					onChange={(event) => setTaskDate(event.target.value)}
				></input>
				<br></br>
				<br></br>
			</Form.Group>
			<Button variant="primary mb-3" type="submit">
				Submit
			</Button>
		</Form>
	);
}

function Schooladdtask() {
	const { loggedInId: schoolId } = useContext(navContext);
	const [todos, setTodos] = React.useState([]);

	useEffect(() => {
		axios.get(`https://team-44-for-win.herokuapp.com/portal/requirement`).then((res) => {
			const tasks = res.data.filter((x) => x.school === schoolId);
			setTodos(tasks.map((x) => x.requirement));
		});
	}, []);
	const addTodo = (text) => {
		const newTodos = [...todos, text];

		setTodos(newTodos);
	};

	return (
		<div className="app">
			<div className="container">
				<h1 className="text-center mb-4">ADD TASK</h1>
				<FormTodo addTodo={addTodo} schoolId={schoolId} />
				<h3>Your Tasks</h3>
				<div>
					{todos.map((todo) => (
						<Card key={todo}>
							<Card.Body>{todo}</Card.Body>
						</Card>
					))}
					<br />
				</div>
			</div>
		</div>
	);
}

export default Schooladdtask;
