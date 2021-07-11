import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Button, Card, Badge } from "react-bootstrap";

const TaskCard = ({
	public: pblic,
	volunteer,
	_id,
	requirement,
	interest,
	school,
	date,
	city,
}) => {
	const [assigned, setAssigned] = useState(pblic <= 0);
	const [showUsers, setShowUsers] = useState(false);
	const [regUsers, setRegUsers] = useState([]);

	const doAssign = useCallback(() => {
		setAssigned(true);
		axios.post(
			`https://team-44-for-win.herokuapp.com/portal/requirement/${_id}/add-more/${pblic}`
		);
	}, []);

	const toggleRegUsers = () => {
		if (showUsers) {
			setShowUsers(false);
			setRegUsers([]);
		} else {
			setShowUsers(true);
		}
	};

	useEffect(() => {
		if (showUsers) {
			axios.get("https://team-44-for-win.herokuapp.com/volunteer").then((res) => {
				console.log(res);
				setRegUsers(volunteer.map((x) => res.data.find((val) => x === val._id).name));
			});
		}
	}, [showUsers]);

	// const newDate = new Date()
	// const newDate = new Intl.DateTimeFormat("en-GB", {
	// 	year: "numeric",
	// 	month: "long",
	// 	day: "2-digit",
	// }).format(
	// 	new Date(`${date.slice(6, 10)}-${date.slice(3, 5)}-${date.slice(0, 2)}`)
	// );
	return (
		<>
			<Card style={{ marginTop: "10px" , borderRadius:"10px" }}>
				<Card.Body>
					<div style={{ display: "flex", justifyContent: "space-between" }}>
						<div>
							<Card.Title>{school.name}</Card.Title>
							<Card.Text>{city}</Card.Text>
							<Card.Text>{requirement}</Card.Text>
							<span>
								{date}
							</span>
							{"  "}
							<Badge variation="success" style={{ textColor: "white", background: "orange" }}>
								{interest}
							</Badge>
						</div>
						<div>
							<Button variant={"success"} disabled={assigned} onClick={doAssign}>
								{assigned ? "Assigned" : "Assign"}
							</Button>
							<div>{pblic > 0 ? pblic : 0} slots</div>
						</div>
					</div>
					<br></br>
					<div
						style={{ textDecorationLine: "underline", cursor: "pointer", color: "blue" }}
						onClick={toggleRegUsers}
					>
						{showUsers ? "Hide" : `View ${volunteer.length} registered volunteers`}
					</div>
					{showUsers &&
						regUsers.map((name) => {
							return <div key={name}>{name}</div>;
						})}
				</Card.Body>
			</Card>
		</>
	);
};

const TaskAssign = () => {
	const [taskData, setTaskData] = useState([]);

	let taskTemp;
	useEffect(() => {
		axios
			.get("https://team-44-for-win.herokuapp.com/portal/requirement")
			.then((res) => {
				taskTemp = res.data;
				return axios.get(`https://team-44-for-win.herokuapp.com/school`);
			})
			.then((res) => {
				for (const task of taskTemp) {
					task.school = res.data.find((x) => x._id === task.school);
				}
				setTaskData(taskTemp);
			});
	}, []);

	return (
		<div style={{ padding: "40px" }}>
			<h2>Tasks</h2>
			{taskData.map((val) => (
				<TaskCard key={val._id} {...val} />
			))}
		</div>
	);
};

export default TaskAssign;
