import React from "react";
import { Redirect } from "react-router-dom";
import "./Form.css";
import { useState } from "react";
import validate from "./validateInfo";
import useForm from "./useForm";
import axios from "axios";
import { Link } from "react-router-dom";
// import { navContext } from "./App";
import jwt_decode from "jwt-decode";
import { navContext } from "../../App";
import { useHistory } from "react-router-dom";

// const MyComponent = (props) => {
//   const history = useHistory();

//   handleOnSubmit = () => {
//     history.push(`/dashboard`);
//   };
// };

const LoginForm = () => {
	const {
		schoolloggedin,
		setSchoolLoggedIn,
		volunteerloggedin,
		setVolunteerLoggedIn,
		adminloggedin,
		setAdminLoggedIn,
		setLoggedInId,
	} = React.useContext(navContext);
	const history = useHistory();

	const [errors, setErrors] = useState({});

	const [values, setValues] = useState({
		email: "",
		password: "",
	});
	const handleChange = (e) => {
		const { name, value } = e.target;
		setValues({
			...values,
			[name]: value,
		});
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("val", values);
		const ldata = {
			email: values.email,
			password: values.password,
		};
		console.log("subb");

		axios
			.post("https://team-44-for-win.herokuapp.com/users/login", ldata)
			.then((response) => {
				if (response.data.success) {
					const decoded = jwt_decode(response.data.token);
					setLoggedInId(decoded.id);
					console.log("id ", decoded.id);
					console.log(response.data);
					if (response.data.role === 0) {
						setSchoolLoggedIn(true);
						history.push(`/`);
					} else if (response.data.role === 1) {
						setVolunteerLoggedIn(true);
						history.push(`/`);
					} else if (response.data.role === 2) {
						setAdminLoggedIn(true);
						history.push(`/`);
					}
				}
			})
			.catch((err) => setErrors(err.response.data));
		console.log(errors);
	};

	return (
		<div className="form-content-right2">
			<form onSubmit={handleSubmit} className="form" noValidate>
				<h1>LOGIN</h1>
				<div className="form-inputs">
					<label className="form-label">Email</label>
					<input
						className="form-input"
						type="email"
						name="email"
						placeholder="Enter your Email"
						value={values.email}
						onChange={handleChange}
					/>
					
					
				</div>
				<div className="form-inputs">
					<label className="form-label">Password</label>
					<input
						className="form-input"
						type="password"
						name="password"
						placeholder="Enter your password"
						value={values.password}
						onChange={handleChange}
					/>
					{errors.message && <p style={{textAlign:"center"}}>{errors.message}</p>}
					{errors.passwordincorrect && <p style={{textAlign:"center"}}>{errors.passwordincorrect}</p>}
				</div>
				<button className="form-input-btn" type="submit" onClick={() => {}}>
					Login
				</button>
				<span className="form-input-login">
					Dont have an account? SignUp{" "}
					<Link style={{ color: "blue" }} to="/sign-up">
						here
					</Link>
				</span>
			</form>
		</div>
	);
};

export default LoginForm;
