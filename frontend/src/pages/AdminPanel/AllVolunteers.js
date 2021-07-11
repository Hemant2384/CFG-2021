import React, { useState, useEffect } from "react";
import { Card, Badge, Button, ButtonGroup } from "react-bootstrap";
import axios from "axios";

const VolunteerCard = ({ _id, verify, name, profession, contact, location, city, email, interest }) => {
	const [verified, setVerified] = useState(false);
	function verifyUser() {
        console.log("verifying "+_id)
        axios.post(`https://team-44-for-win.herokuapp.com/portal/verify/${_id}/volunteer`).then((res)=>{
            console.log(res);
        });
		setVerified(true);
	}

	return (
		<Card style={{ margin: "10px" , borderRadius: "15px", boxShadow: '0 0px 8px #0A7EEB' }}>
			<Card.Body>
				<Card.Title>{name}</Card.Title>
				<Card.Text>{profession}</Card.Text>
				<Card.Text>
					{location}, {city}
				</Card.Text>
				<Card.Text>{email}</Card.Text>
				<Card.Text>Phone {contact}</Card.Text>
				<Badge variation="success" style={{ textColor: "white", background: "orange", padding: '10px 20px' }}>
					{interest}
				</Badge>
				{verify && (
					<Button
						variant="success"
						disabled={verified}
						onClick={verifyUser}
						style={{ float: "right" }}
					>
						{verified ? "Verified" : "Verify!"}
					</Button>
				)}
			</Card.Body>
		</Card>
	);
};

const AllVolunteers = () => {
	const [volunteerInfo, setVolunteerInfo] = useState({});
	useEffect(() => {
		axios.get("https://team-44-for-win.herokuapp.com/portal/volunteer").then(({ data }) => {
			const vols = {
				unverified: [],
				verified: [],
			};
			for (const user of data) {
				if (user.verified) {
					vols.verified.push(user);
				} else {
					vols.unverified.push(user);
				}
			}

			setVolunteerInfo(vols);
		});
	}, []);

	const [selectedPage, setSelectedPage] = useState(0); //0 - unverified, 1 - verified

	return (
		<div style={{ padding: "50px 50px" }}>
			<div style={{ display: "flex", justifyContent: "center", marginBottom: "30px" }}>
				<ButtonGroup aria-label="Basic example">
					<Button
						variant={selectedPage === 0 ? "primary" : "secondary"}
						onClick={() => setSelectedPage(0)}
						size="lg"
					>
						Unverified
					</Button>
					<Button
						variant={selectedPage === 1 ? "primary" : "secondary"}
						onClick={() => setSelectedPage(1)}
						size="lg"
					>
						Verified
					</Button>
				</ButtonGroup>
			</div>
			<div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", padding: "40px" }}>
				{(selectedPage === 0 ? volunteerInfo.unverified : volunteerInfo.verified)?.map((data) => (
					<VolunteerCard verify={selectedPage === 0} key={data.email} {...data} />
				))}
			</div>
		</div>
	);
};

export default AllVolunteers;
