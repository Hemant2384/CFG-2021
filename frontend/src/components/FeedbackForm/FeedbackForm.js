import React from "react";
import { Redirect } from "react-router-dom";
import "./Form.css";
import { useState, useContext } from "react";
// import validate from "./validateInfo";
// import useForm from "./useForm";
import axios from "axios";
import { Link } from "react-router-dom";

import { navContext } from "../../App"; 



const FeedbackForm = () => {
	const { loggedInId: userId } = React.useContext(navContext);
	
	
	

	const [values, setValues] = useState({
		attendance: "",
		description: "",
	});
	const handleChange = (e) => {
		const { name, value } = e.target;
		setValues({
			...values,
			[name]: value
		  });
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(values); 
		const ldata={
			"attendance":values.attendance,
			"description":values.description
		}

		
		axios
			.post(`https://team-44-for-win.herokuapp.com/volunteer/${userId}/feedback`, ldata)
			.then((response) => {
				alert("attendance markedd");
				
			})
			.catch((err) => console.log(err));
			
	};
		
	
		
		

	// 	axios
	// 		.post("https://team-44-for-win.herokuapp.com/users/login", ldata)
	// 		.then((response) => {

	// 			if (response.data.success) {
					
	// 				// const decoded = jwt_decode(response.data.token);
	// 				console.log("roloe",response.data.role);
	// 				if(response.data.role===0){
	// 					setSchoolLoggedIn(true);
	// 					history.push(`/`);	
	// 				}
	// 				else if(response.data.role===1){
	// 					setVolunteerLoggedIn(true);
	// 					history.push(`/`);
	// 				}
	// 				else if(response.data.role===2){
	// 					setAdminLoggedIn(true);
	// 					history.push(`/`);
	// 				}
	// 			}
				
				
				
	// 		})
	// 		.catch((err) => console.log(err));
	// 		console.log(errors);
	// };

	return (
		<div className="form-content-right2 " style={{marginTop:"15%", boxSizing:"border-box", boxShadow:"0px 0px 8px #101522"}}>
			{/* onSubmit={handleSubmit} */}
			<form  onSubmit={handleSubmit} className="form" noValidate>
				<h1>FEEDBACK FORM</h1>
				<p><em>For your Latest Event</em></p>
				<br></br>


				<div className='form-inputs1'>
          <label className='form-label'>ATTENDANCE</label>
          <select className='att' onChange={handleChange} name="attendance">
			<option>mark attendance</option>
           <option value="1">PRESENT</option>
           <option value="0">ABSENT</option> 
          </select>

        </div>
		<br></br>
        <div className='form-inputs1'>
          <label className='form-label'onChange={handleChange} name="description">FEEDBACK</label>
          <input
            className='form-input'
            type='text-area'
            name='description'
            placeholder='Enter your feedback'
            value={values.description}
            onChange={handleChange}
          />
				</div>
				<button className="form-input-btn" type="submit" onClick={()=>{

				}}>
					SUBMIT
				</button>
			</form>
		</div>
	);
};

export default FeedbackForm;