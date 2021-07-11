import React from 'react';
import './Form.css';

const FormSuccess = ({ssr,setIsSubmitted}) => {
  return (
    <div className='form-content-right'>
      <h1 className='form-success'>We have received your request!</h1>
      <p className='form-input-login'>
          Login <a style={{color:"blue"}} onClick={()=>{
            ssr(false)
            setIsSubmitted(false);
          }}>here</a>
        </p>

      <img className='form-img-2' src='' alt='imge' />
    </div>
  );
};

export default FormSuccess;