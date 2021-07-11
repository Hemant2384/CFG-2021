import React from 'react';

import useForm from './useForm';
import validate from './validateInfo';
import {Link} from 'react-router-dom' 
import axios from 'axios'
import { useHistory } from 'react-router-dom'


export default function Schoolsignup() {
    const history = useHistory();
    const [values,setValues]=React.useState({
        schoolname:"",
        schoolid:"",
        location:"",
        password:"",
        password2:""
    }) 
    const initialErrors={
        schoolname:"",
        schoolid:"",
        location:"",
        password:"",
        password2:""

    }
    const [errors,setErrors]=React.useState(initialErrors);
    const handleChange = e => {
        const { name, value } = e.target;
        setValues({
          ...values,
          [name]: value
        });
      };
    
      const handleSubmit= e =>{
          e.preventDefault();
          setErrors(initialErrors);
            console.log(values);
    //         //all any field is empty
         for(const i in values){
    //         // console.log("i",values[i]);
             if(values[i]==="") {
                setErrors((prev)=>{
                    return({
                       ...prev,
                       [i]:`${i} is required`
   
                    })
             })
             
             }
            
          
            if(i==="password"){
                if(values[i].length<6){
                    setErrors((prev)=>{
                        return({
                           ...prev,
                           [i]:`Minimun 6 characters`,
                           password2:`Minimun 6 characters`
       
                        })
                       
                            })
                    
                }
            }
                
            

             if(i==="password2"){
                 if(values.password!==values[i])
                 {
                    setErrors((prev)=>{
                        return({
                           ...prev,
                           [i]:`passwords dont match`
       
                        })
                       
                            })
                    }
                    }
                 }

                if(!(errors.schoolid && errors.schoolname && errors.location && errors.password &&
                    errors.password2)){
                        const sdata={
                            "username":values.schoolname,
                            "email":values.schoolid,
                            "contact":values.location,
                            "password":values.password,
                            "password2":values.password2
                          };
                          console.log(sdata);
                          axios({
                            method:'POST',
                            url:'https://team-44-for-win.herokuapp.com/users/school/register',
                            data:sdata
                          })
                          .then(res=>{
                            //   const url=huehebee;
                            alert("submiteed");
                              
                          })
                          .catch(err=>console.log("error"))
                }

                console.log(errors,values)

                 }
             
            
         
    //      console.log(errors)
      
    return (
        <div>
             <div className="form-content-right1">

      <form onSubmit={handleSubmit} className='form' noValidate>
        <br></br><br></br><br></br><br></br><br></br>
        <br></br>
     
        <h1>
         Register as School
        </h1>
        <div className='form-inputs'>
          <label className='form-label'>School Name</label>
          <input
            className='form-input'
            type='text'
            name='schoolname'
            placeholder='Enter your organisation name'
            value={values.schoolname}
            onChange={handleChange}
          />
          {errors.schoolname && <p>{errors.schoolname}</p>}
        </div>
        <div className='form-inputs'>
          <label className='form-label'>School Email</label>
          <input
            className='form-input'
            type='email'
            name='schoolid'
            placeholder='Enter your email'
            value={values.schoolid}

            onChange={handleChange}
          />
          {errors.schoolid && <p>{errors.schoolid}</p>}
        </div>
        <div className='form-inputs'>
          <label className='form-label'>contact</label>
          <input
            className='form-input'
            type='text'
            name='location'

            placeholder='Enter your contact'
            value={values.location}

        
            onChange={handleChange}
          />
          {errors.Location && <p>{errors.Location}</p>}
        </div>
        <div className='form-inputs'>
          <label className='form-label'>Password</label>
          <input
            className='form-input'
            type='password'
            name='password'
            placeholder='Enter your password'
            value={values.password}
            onChange={handleChange}
          />
          {errors.password && <p>{errors.password}</p>}
        </div>
        <div className='form-inputs'>
          <label className='form-label' >Confirm Password</label>
          <input
            className='form-input'
            id='confirm'
            type='password'
            name='password2'
            placeholder='Confirm your password'
            value={values.password2}
            onChange={handleChange}
          />
          {errors.password2 && <p>{errors.password2}</p>}
        </div>
        <button className='form-input-btn' type='submit'>
          Sign up
        </button>
        <span className='form-input-login'>
          Already have an account? Login <Link style={{color:"blue"}}
          to="/login"
          >here</Link>
        </span>
      </form>
      </div>
            
        </div>
    )
}


