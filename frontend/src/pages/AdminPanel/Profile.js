import React from 'react'
import './Profile.css'

function Profile(props) {

      return (
        <div id="profile-id">
           
             <p className="volunteer-profile">Name: {props.volunteer.name}</p> 
             <p className="volunteer-profile">Age: {props.volunteer.age}</p> 
             <p className="volunteer-profile"> Bloodgroup: {props.volunteer.blood}</p> 
             <p className="volunteer-profile">location: {props.volunteer.city}, {props.volunteer.pincode}</p>  
             <p className="volunteer-profile">phoneNo: {props.volunteer.contact}</p> 
             <p className="volunteer-profile">email: {props.volunteer.email}</p>   
             <p className="volunteer-profile">Interest: {props.volunteer.interest}</p>   
             <p className="volunteer-profile">profession: {props.volunteer.profession}</p>   
             <p className="volunteer-profile">Address: {props.volunteer.address}</p>   
           
        </div>
      )

  }

  export default Profile;