import React from 'react';
import './Form.css';
import validate from './validateInfo';
import useForm from './useForm';
import { Link } from 'react-router-dom';
import Schoolsignup from './Schoolsignup';
import Volunteersignup from './Volunteersignup';



const FormSignup = () => {
  const { handleChange, handleSubmit, values, errors } = useForm(  
    validate
  ); 
  const [showVolunteerRegister,setShowVolunteerRegister]=React.useState(false);
  

  return (
    <> 
     <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}> 
      <div class="btn-group" role="group" aria-label="Basic example">
        <button type="button" class="btn btn-secondary" onClick={()=>{
          setShowVolunteerRegister(false)
        }}>Register as School</button>
        <button type="button" class="btn btn-secondary" onClick={()=>{
          setShowVolunteerRegister(true)
        }}>Register as Volunteer</button>
      </div>
      </div>
          
			
	{showVolunteerRegister?<Volunteersignup />: <Schoolsignup />}
       
      
    </>
  );
};

export default FormSignup;