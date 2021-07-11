import React, { useState, useEffect } from "react";
import { Card, Badge, Button, ButtonGroup } from "react-bootstrap";
import axios from "axios";

const SchoolCard = ({ _id, verify, name, schoolID, address, city, pincode, email }) => {
	const [verified, setVerified] = useState(false);
	function verifySchool() {
		console.log("verifying " + _id);
		axios.post(`https://team-44-for-win.herokuapp.com/portal/verify/${_id}/school`).then((res) => {
			console.log(res);
		});
		setVerified(true);
	}

	return (
		<Card style={{ margin: "10px" , borderRadius: "15px", boxShadow: '0 0px 8px #0A7EEB'}}>
			<Card.Body>
				<Card.Title>{name}</Card.Title>
				<Card.Text>{schoolID}</Card.Text>
				<Card.Text>{address}</Card.Text>
				<Card.Text>
					{city}, {pincode}
				</Card.Text>

				<Card.Text>{email}</Card.Text>
				{verify && (
					<Button
						variant="success"
						disabled={verified}
						onClick={verifySchool}
						style={{ float: "right" }}
						size="lg"
					>
						{verified ? "Verified" : "Verify!"}
					</Button>
				)}
			</Card.Body>
		</Card>
	);
};

const AllSchools = () => {
	const [schoolInfo, setSchoolInfo] = useState({});
	useEffect(() => {
		axios.get("https://team-44-for-win.herokuapp.com/portal/school").then(({ data }) => {
			const scols = {
				unverified: [],
				verified: [],
			}; 
			for (const school of data) {
				if (school.verified) {
					scols.verified.push(school);
				} else  {
					scols.unverified.push(school);
				}
			}
			setSchoolInfo(scols);
		});
	}, []);

	const [selectedPage, setSelectedPage] = useState(0); //0 - unverified, 1 - verified

	return (
		<div style={{ padding: "50px 50px" }}>
			<div style={{ display: "flex", justifyContent: "center", marginBottom: "30px" }}>
				<br></br><br></br>
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
				{(selectedPage === 0 ? schoolInfo.unverified : schoolInfo.verified)?.map((data) => (
					<SchoolCard verify={selectedPage === 0} key={data._id} {...data} />
				))}
			</div>
		</div>
	);
};

export default AllSchools;
