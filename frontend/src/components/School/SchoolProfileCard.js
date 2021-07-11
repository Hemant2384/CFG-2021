import React, { useEffect, useState, useContext } from "react";
import './School.css'
import axios from "axios";
import { Button, Card, Form } from "react-bootstrap";
import { navContext } from "../../App";

const SchoolProfile = () => {
	const [schoolData, setSchoolData] = useState({});
	const [isEditing, setIsEditing] = useState(false);

	const [schoolDataEdited, setSchoolDataEdited] = useState({});
	const { loggedInId: schoolLogId } = useContext(navContext);

	useEffect(() => {
		axios.get(`https://team-44-for-win.herokuapp.com/school/${schoolLogId}`).then((res) => {
			setSchoolData(res.data);
			setSchoolDataEdited({ ...res.data });
		});
	}, []);

	function onEditSubmit() {
		axios.post(
			`https://team-44-for-win.herokuapp.com/school/update/${schoolLogId}`,
			schoolDataEdited
		);

		setIsEditing(false);
		setSchoolData({ ...schoolDataEdited });
	}

	return (
		<Card style={{ margin: "50px", padding: "20px" }}>
			{isEditing ? (
				<Form>
					<h5>Name</h5>
					<Form.Control
						type="text"
						placeholder="Enter name"
						value={schoolDataEdited.name}
						onChange={(event) =>
							setSchoolDataEdited({ ...schoolDataEdited, name: event.target.value })
						}
					/>
					<h5>Address</h5>
					<Form.Control
						type="text"
						placeholder="Enter address"
						value={schoolDataEdited.address}
						onChange={(event) =>
							setSchoolDataEdited({ ...schoolDataEdited, address: event.target.value })
						}
					/>
					<h5>City</h5>
					<Form.Control
						type="text"
						placeholder="Enter city"
						value={schoolDataEdited.city}
						onChange={(event) =>
							setSchoolDataEdited({ ...schoolDataEdited, city: event.target.value })
						}
					/>
					<h5>Pincode</h5>
					<Form.Control
						type="text"
						placeholder="Enter pincode"
						value={schoolDataEdited.pincode}
						onChange={(event) =>
							setSchoolDataEdited({ ...schoolDataEdited, pincode: event.target.value })
						}
					/>
					<h5>School ID</h5>
					<Form.Control
						type="text"
						placeholder="Enter school ID"
						value={schoolDataEdited.schoolID}
						onChange={(event) =>
							setSchoolDataEdited({ ...schoolDataEdited, schoolID: event.target.value })
						}
					/>
					<br />
					<Button variant="primary" onClick={onEditSubmit}>
						Submit
					</Button>
				</Form>
			) : (
				<Card.Body>
					<Card.Title>{schoolData.name}</Card.Title>
					<Card.Text>{schoolData.address}</Card.Text>
					<Card.Text>{schoolData.city}</Card.Text>
					<Card.Text>{schoolData.pincode}</Card.Text>
					<Card.Text>{schoolData.schoolID}</Card.Text>
					<Button
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

export default SchoolProfile;
