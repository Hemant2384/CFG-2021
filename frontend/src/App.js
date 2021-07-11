import React from "react";
import GlobalStyle from "./globalStyles";
import Home from "./pages/HomePage/Home";
import SignUp from "./pages/SignUp/SignUp";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import { Navbar, Footer } from "./components";
import FeedbackForm from "./components/FeedbackForm/FeedbackForm";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./pages/login/Login";
// import createpost from './components/createpost/createpost';

import Createpost from "./pages/createpost/Createpost";
import Viewpeople from "./pages/viewpeople/Viewpeople";
import Opportunities from "./pages/opportunities/opportunities";
import SchoolProfile from "./components/School/SchoolProfileCard";
//import Footer from "./components/Footer/Footer";
import VolunteerProfile from "./pages/Volunteers/VolunteerProfileCard";
import AllSchools from "./pages/AdminPanel/AllSchools";
import AllVolunteers from "./pages/AdminPanel/AllVolunteers";
import Volunteers from "./pages/Volunteers/Volunteers";
import Forum from "./pages/Forum/Forum";
import {data} from "./pages/Forum/ForumData";
import TaskAssign from "./pages/AdminPanel/TaskAssign";
// import School from "../src/components/School/School";
import SchoolTab from "../src/components/School/SchoolTab"
// import Schoollisttask from "./components/School/Schoollisttask";
// import VolunteerProgress from './pages/AdminPanel/VolunteerProgress'
import Youtube from "./pages/youtube/youtube";
export const navContext = React.createContext();


function App() {
	const [schoolloggedin, setSchoolLoggedIn] = React.useState(false);
	const [volunteerloggedin, setVolunteerLoggedIn] = React.useState(false);
	const [adminloggedin, setAdminLoggedIn] = React.useState(false);
	const [loggedInId, setLoggedInId] = React.useState("");

	// const [loggedin, setLoggedin] = React.useState(false);

	// const [userId, setUserId] = React.useState(null);
	return (
		<Router>
			<navContext.Provider
				value={{
					schoolloggedin,
					setSchoolLoggedIn,
					volunteerloggedin,
					setVolunteerLoggedIn,
					adminloggedin,
					setAdminLoggedIn,
					loggedInId,
					setLoggedInId,
				}}
			>
				<GlobalStyle />
				<ScrollToTop />
				<Navbar />
				<Switch>
					<Route path="/" exact component={Home} />
					<Route path="/sign-up" component={SignUp} />
					<Route path="/login" component={Login} />

					{volunteerloggedin && <Route path="/oppor" component={Opportunities} />}
					{volunteerloggedin && <Route path="/volunteerprofile" component={VolunteerProfile} />}
          {volunteerloggedin && <Route path="/volunteerfeedback" component={FeedbackForm} />}
          {((volunteerloggedin)||(schoolloggedin)||(adminloggedin)) && <Route path="/forum"><Forum data={data}/></Route>}

					{schoolloggedin && <Route path="/tasks" component={SchoolTab} />}
					{schoolloggedin && <Route path="/schoolprofile" component={SchoolProfile} />}
					{schoolloggedin && <Route path="/video"><Youtube/></Route>}


					{/* {adminloggedin && <Route path="/volunteers" component={Volunteers} />} */}
          {adminloggedin && <Route path="/volunteers" component={AllVolunteers} />} 
          {adminloggedin && <Route path="/volunteerprogress" component={Volunteers} />}
					{adminloggedin && <Route path="/organisations" component={AllSchools} />}
          {adminloggedin && <Route path="/taskassign" component={TaskAssign} />}
          
				</Switch>
				{/* <Footer /> */}
			</navContext.Provider>
		</Router>
		// <div className="VolunteerProgress">
		// <VolunteerProgress volunteer={volunteer_data}/>
		// </div>
		// <div>
		// 	<Forum data = {data}/>
		// </div>
	);
}

export default App;
