import axios from "axios";
import './Volunteer.css'
import React, { useEffect, useState, useContext } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { navContext } from "../../App";


const VolunteerProfile = () => {
	const [volunteerData, setVolunteerData] = useState({});
	const [isEditing, setIsEditing] = useState(false);

	const [volunteerDataEdited, setVolunteerDataEdited] = useState({});
	const { loggedInId: userId } = useContext(navContext);

	useEffect(() => {
		axios.get(`https://team-44-for-win.herokuapp.com/volunteer/${userId}`).then((res) => {
			setVolunteerData(res.data);
			setVolunteerDataEdited({ ...res.data });
		});
	}, []);

	function onEditSubmit() {
		axios.post(
			`https://team-44-for-win.herokuapp.com/volunteer/update/${userId}`,
			volunteerDataEdited
		);

		setIsEditing(false);
		setVolunteerData({ ...volunteerDataEdited });
	}

	return (
		<Card id="head">
			{isEditing ? (
				<Form>
                     
					<h5>Name</h5>
					<Form.Control
						type="text"
						placeholder="Enter name"
						value={volunteerDataEdited.name}
						onChange={(event) =>
							setVolunteerDataEdited({ ...volunteerDataEdited, name: event.target.value })
						}
					/>
					<h5>Address</h5>
					<Form.Control
						type="text"
						placeholder="Enter address"
						value={volunteerDataEdited.address}
						onChange={(event) =>
							setVolunteerDataEdited({ ...volunteerDataEdited, address: event.target.value })
						}
					/>
					<h5>City</h5>
					<Form.Control
						type="text"
						placeholder="Enter city"
						value={volunteerDataEdited.city}
						onChange={(event) =>
							setVolunteerDataEdited({ ...volunteerDataEdited, city: event.target.value })
						}
					/>
					<h5>Pincode</h5>
					<Form.Control
						type="text"
						placeholder="Enter pincode"
						value={volunteerDataEdited.pincode}
						onChange={(event) =>
							setVolunteerDataEdited({ ...volunteerDataEdited, pincode: event.target.value })
						}
					/>
					<h5>Phone Number</h5>
					<Form.Control
						type="text"
						placeholder="Enter phone number"
						value={volunteerDataEdited.contact}
						onChange={(event) =>
							setVolunteerDataEdited({ ...volunteerDataEdited, contact: event.target.value })
						}
					/>
					<br />
					<Button id="hj" variant="primary" onClick={onEditSubmit}>
						Submit
					</Button>
				</Form>
			) : (
				<Card.Body>
					<Card.Title>{volunteerData.name}</Card.Title>
					<Card.Text>{volunteerData.address}</Card.Text>
					<Card.Text>{volunteerData.city}</Card.Text>
					<Card.Text>{volunteerData.pincode}</Card.Text>
					<Card.Text>{volunteerData.interest}</Card.Text>
					<Card.Text>{volunteerData.contact}</Card.Text>
					<Button id="hj"
						variation="primary"
						style={{ float: "right" }}
						onClick={() => setIsEditing(true)}
					>
						Edit
					</Button>
				</Card.Body>
			)}
		</Card>
	);
};

export default VolunteerProfile;
