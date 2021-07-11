import { ButtonGroup, Button, Card, Badge } from "react-bootstrap";
import React, { useCallback, useContext, useEffect, useState } from "react";
import axios from "axios";
import { navContext } from "../../App";

const OpportunityCard = ({ userId, applied, _id, requirement, interest, school, date, city }) => {
	const [applyClicked, setApplyClicked] = useState(false);

	const submitRequest = useCallback(() => {
		setApplyClicked(true);
		axios.post(`https://team-44-for-win.herokuapp.com/volunteer/${userId}/accept/${_id}`);
	}, []);

	return (
		<>
			<Card style={{ marginTop: "10px" }}>
				<Card.Body>
					<div style={{ display: "flex", justifyContent: "space-between" }}>
						<div>
							<Card.Title>{school?.name}</Card.Title>
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
						<Button
							variant={applied || applyClicked ? "success" : "primary"}
							disabled={applied || applyClicked}
							onClick={submitRequest}
						>
							{applied || applyClicked ? "Applied" : "Apply!"}
						</Button>
					</div>
				</Card.Body>
			</Card>
		</>
	);
};

const Opportunities = ({ userId }) => {
	const [opportunityInfo, setOpportunityInfo] = useState([]);
	useEffect(() => {
		let taskInfoNew;
		axios
			.get(`https://team-44-for-win.herokuapp.com/volunteer/${userId}/future-meetings`)
			.then((res) => {
				taskInfoNew = res.data;
				return axios.get(`https://team-44-for-win.herokuapp.com/school`);
			})
			.then((res) => {
				for (const task of taskInfoNew) {
					task.school = res.data.find((x) => x._id === task.school);
				}
				setOpportunityInfo(taskInfoNew);
			});
	}, []);

	return opportunityInfo.map((data) => (
		<OpportunityCard userId={userId} key={data._id} {...data} />
	));
};

const Tasks = ({ userId }) => {
	const [taskData, setTaskData] = useState([]);
	useEffect(() => {
		let taskInfoNew;
		axios
			.get(`https://team-44-for-win.herokuapp.com/volunteer/${userId}`)
			.then((res) => {
				taskInfoNew = res.data.requirement;
				return axios.get(`https://team-44-for-win.herokuapp.com/portal/requirement`);
			})
			.then((res) => {
				taskInfoNew = taskInfoNew.map((val) => res.data.find((x) => x._id === val));
				return axios.get(`https://team-44-for-win.herokuapp.com/school`);
			})
			.then((res) => {
				for (const task of taskInfoNew) {
					task.school = res.data.find((x) => x._id === task.school);
				}
				setTaskData(taskInfoNew);
			});
	}, []);

	return (
		<div>
			<h1>Your registered tasks</h1>
			{taskData.map((data) => (
				<OpportunityCard applied userId={userId} key={data._id} {...data} />
			))}
			<h1 style={{ marginTop: "20px" }}>Your attendance info</h1>
			{/* todo some graph data maybe */}
		</div>
	);
};

const VolunteerTab = () => {
	const [selectedPage, setSelectedPage] = useState(0); //0 - available opportunities, 1 - task info

	const { loggedInId: userId } = useContext(navContext);

	return (
		<div style={{ padding: "0 50px" }}>
			<div style={{ display: "flex", justifyContent: "center", marginBottom: "30px" }}>
				<ButtonGroup aria-label="Basic example">
					<Button
						variant={selectedPage === 0 ? "primary" : "secondary"}
						onClick={() => setSelectedPage(0)} size = "lg"
					>
						Opportunities
					</Button>
					<Button
						variant={selectedPage === 1 ? "primary" : "secondary"}
						onClick={() => setSelectedPage(1)} size = "lg"
					>
						Task Info
					</Button>
				</ButtonGroup>
			</div>
			{selectedPage === 0 ? <Opportunities userId={userId} /> : <Tasks userId={userId} />}
		</div>
	);
};
export default VolunteerTab;
