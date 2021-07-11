import axios from 'axios';
import { useState, useEffect } from 'react';

const useForm = (callback, validate) => {
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    password2: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const sdata={
      "username":values.username,
      "email":values.email,
      "contact":values.email,
      "password":values.password,
      "password2":values.password2
    };
    setErrors(validate(values));
    axios({
      method:'POST',
      url:'https://jpmc-blog-backend.herokuapp.com/api/users/register',
      data:sdata
    })
    .then(res=>setIsSubmitting(true))
    .catch(err=>setErrors(err.response.data))


  
    
  };

  useEffect(
    () => {
      if (Object.keys(errors).length === 0 && isSubmitting) {
        callback();
      }
    },
    [errors]
  );

  return { handleChange, handleSubmit, values, errors };
};

export default useForm;