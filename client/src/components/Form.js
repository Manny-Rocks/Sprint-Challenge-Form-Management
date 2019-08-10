import React, { useState, useEffect } from 'react';
import { Form, Field, withFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';


const MyForm = ({ touched,errors,status,values }) => {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (status) {
      setUsers([...users, status]);
    }
  }, [status]);

    return (
      <div className='registrationForm'>
        <h1>Registration</h1>
        <Form>
          <Field type='text' name='username' placeholder='username' className='form-field' />
          {touched.username && errors.username && (<p className='error'>{errors.username}</p> )}
          
          
          <Field type='password'  name='password' placeholder='Password' className='form-field' />
          {touched.password && errors.password && ( <p className='error'>{errors.password}</p>  )}
           <button type='submit'>Submit</button> 

        </Form>
        
        
      </div>
    );
  
};
const FormikMyForm = withFormik({
    mapPropsToValues({ username, password }) {
      return {
        username: username || '',
        password: password || ''
      };
    },
  
    validationSchema: Yup.object().shape({
      username: Yup
        .string()
        .required('You have to provide a username')
        .min(6, 'Username must be at least 5 characters long.'),
      password: Yup
        .string()
        .min(6, 'Password must be at least 6 characters long.')
        .required('You need a password to log in'),
    }),
  
    handleSubmit(values, { setStatus, setErrors, resetForm }) {
    
      if (values.username === "Mannyyy") {
        setErrors({ username: "That username is already taken by someone else" });
      } else {
  
        axios
          .post(`http://localhost:5000/api/register`, values)
          .then(response => {
            console.log('res in axios', response.data)
            setStatus(response.data);
            localStorage.setItem('', response.data.token);
            resetForm();
          })
          .catch(error =>
            console.log("Error in handleSubmit post call", error.response)
          );
        
      }
    }
  })(MyForm);
  
  export default FormikMyForm;
