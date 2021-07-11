import React, { useState } from 'react';
import './Form.css';
import FormSignup from './FormSignup';
import FormSuccess from './FormSuccess';
import LoginForm from './LoginForm';


const Form = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showregister,setShowRegister]=useState(true);

  function submitForm() {
    setIsSubmitted(true);
  }
  return (
    <>
    <h1 className='wel'>Welcome to our Website</h1>
      <div id="set" className='form-container'>
        <span className='close-btn'>×</span>
        <div className='form-content-left'>
          <img className='form-img' src='img/imgg.jpg' alt='spaceship' />
        </div>
        {showregister?(!isSubmitted ? (<FormSignup submitForm={submitForm} ssr={setShowRegister} />) : (<FormSuccess ssr={setShowRegister} setIsSubmitted={setIsSubmitted} />)):
       <LoginForm submitForm={submitForm} ssr={setShowRegister} />}
        {}
      </div>
    </>
  );
};
export default Form;