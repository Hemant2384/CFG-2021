import React from 'react';
import './Form.css'
import useForm from './useForm';
import validate from './validateInfo'; 
import {Link} from 'react-router-dom';
import axios from 'axios';

export default function Volunteersignup() {
   

      const [values,setValues]=React.useState({
        Name:"",
        Email:"",
        address:"",
        City:"",
        Pincode:"",
        mobile:"",
        blood:"",
        dob:"",
        Profession:"",
        interest:"",
        Password:"",
        Password2:"",
        duration:""
    }) 
    const initialErrors={
        Name:"",
        Email:"",
        address:"",
        City:"",
        Pincode:"",
        mobile:"",
        blood:"",
        dob:"",
        Profession:"",
        interest:"",
        Password:"",
        Password2:"",
        duration:""
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
                 if(values.password===values[i])
                 {
                    setErrors((prev)=>{
                        return({
                           ...prev,
                           [i]:`Passwords dont match`
       
                        })
                       
                     })
                    }
                    }
                    if(i==="mobile"){
                      if(values[i].length<9 && values[i].length>9)
                      {
                        setErrors((prev)=>{
                          return({
                             ...prev,
                             [i]:`Please enter a valid phone number`
         
                          })
                         
                       })
                      }
                    }
                      if(i==="dob"){
                        if(values[i].length<10 && values[i].length>10)
                        {
                          setErrors((prev)=>{
                            return({
                               ...prev,
                               [i]:`Please enter in correct format`
           
                            })
                           
                         })
                      }
                    }






                 }
                 if(JSON.stringify(initialErrors)===JSON.stringify(errors)){ 
                    const sdata={
                        "name":values.Name,
                        "email":values.Email,
                        "address":values.address,
                        "city":values.City,
                        "pincode":values.Pincode,
                        "interest":values.interest,
                        "contact":values.mobile,
                        "dob":values.dob,
                        "blood":values.blood,
                        "duration":values.duration,
                        "profession":values.Profession,
                        "password":values.Password

                      };
                     
                    axios({
                        method:'POST',
                        url:'https://team-44-for-win.herokuapp.com/users/volunteer/register',
                        data:sdata
                      })
                      .then(res=>{
                        //   const url=huehebee;
                        alert("submiteed");
                          
                      })
                      .catch(err=>console.log("error"))
                 }


                console.log(values,errors);
            

                 }
    return (
        <div  style={{marginBottom:"70px"}}>
            <div  className='form-content-right1' style={{marginTop: "700px"}}>
            {/* */}
      <form onSubmit={handleSubmit} className='form' noValidate>
        {/* <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> */}
        <h1 id="vol"> 
         Register as Volunteer
        </h1>
        <div className='form-inputs1'>
          <label className='form-label'>Name</label>
          <input
            className='form-input'
            type='Name'
            name='Name'
            placeholder='Enter your name'
            value={values.Name}
            onChange={handleChange}
          />
          {errors.Name && <p>{errors.Name}</p>}
        </div>
        <div className='form-inputs1'>
          <label className='form-label'>Email Id</label>
          <input
            className='form-input'
            type='email'
            name='Email'
            placeholder='Enter your email'
            value={values.Email}
            onChange={handleChange}
          />
          {errors.Email && <p>{errors.Email}</p>}
        </div>
        <div className='form-inputs1'>
          <label className='form-label'>Address</label>
          <input
            className='form-input'
            type='text-area'
            name='address'
            placeholder='Enter your address'
            value={values.address}
            onChange={handleChange}
          />
          {errors.address && <p>{errors.address}</p>}
        </div>
        <div className='form-inputs1'>
          <label className='form-label'>City</label>
          <input
            className='form-input'
            type='text'
            name='City'
            placeholder='Enter your city name'
            value={values.City}
            onChange={handleChange}
          />
          {errors.City && <p>{errors.City}</p>}
        </div>
        <div className='form-inputs1'>
          <label className='form-label'>PinCode</label>
          <input
            className='form-input'
            type='number'
            name='Pincode'
            placeholder='Enter your PinCode'
            value={values.pincode}
            onChange={handleChange}
          />
          {errors.Pincode && <p>{errors.Pincode}</p>}
        </div>
        <div className='form-inputs1'>
          <label className='form-label'>Phone Number</label>
          <input
            className='form-input'
            type='text'
            name='mobile'
            placeholder='Enter your Phone Number'
            value={values.mobile}
            onChange={handleChange}
          />
          {errors.mobile && <p>{errors.mobile}</p>}
        </div>
        <div className='form-inputs1'>
          <label className='form-label'>Blood Group</label>
          <select className='bg'>
           <option value="B+">B+</option>
           <option value="B-">B-</option>
           <option value="A+">A+</option>
           <option value="A-">A-</option>
           <option value="O+">O+</option>
           <option value="O-">O-</option>
           <option value="AB+">AB+</option>
           <option value="AB-">AB-</option>  
          </select>
         
        </div>
        <div className='form-inputs1'>
          <label className='form-label'>Date of birth</label>
          <input
            className='form-input'
            type='text'
            name='dob'
            placeholder='Enter in DD/MM/YYYY'
            value={values.dob}
            onChange={handleChange}
          />
          {errors.dob && <p>{errors.dob}</p>}
        </div>
        <div className='form-inputs1'>
          <label className='form-label'>Profession</label>
          <input
            className='form-input'
            type='text'
            name='Profession'
            placeholder='Enter your Profession'
            value={values.Profession}
            onChange={handleChange}
          />
          {errors.Profession && <p>{errors.Profession}</p>}
        </div>
        <div className='form-inputs1'>
          <label className='form-label'>Interest</label>
          <select className='bg1'>
           <option value="B+">Research and Development Cell</option>
           <option value="B-">Research and Organization Cell</option>
           <option value="A+">Teaching</option>
           <option value="A-">Human Resource</option>
           <option value="O+">Student Management committee</option>
          </select>
        </div>
        <div className='form-inputs1'>
          <label className='form-label'>Password</label>
          <input
            className='form-input'
            type='password'
            name='Password'
            placeholder='Enter your password'
            value={values.Password}
            onChange={handleChange}
          />
          {errors.Password && <p>{errors.Password}</p>}
        </div> 
        <div className='form-inputs1'>
          <label className='form-label'>How much duration?</label>
          <input
            className='form-input'
            type='number'
            name='duration'
            placeholder='Enter duration you want to contribute?'
            value={values.duration}
            onChange={handleChange}
          />
          {errors.duration && <p>{errors.duration}</p>}
        </div>
        <div className='form-inputs1'>
          <label className='form-label' >Confirm Password</label>
          <input
            className='form-input'
            id='confirm'
            type='password'
            name='Password2'
            placeholder='Confirm your password'
            value={values.Password2}
            onChange={handleChange}
          />
          {errors.Password2 && <p>{errors.Password2}</p>}
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
