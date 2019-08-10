import React, { useState, useEffect } from 'react';
import { Form, Field, withFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

//objects with key value pairs down below...
const MyForm = ({ touched,errors,status,isSubmitting,values}) => {

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
          
        {/* if errors exist then username error will show up that is if username was touched */}

          {touched.username && errors.username && (<p className='error'>{errors.username}</p> )}
          
          <Field type='password'  name='password' placeholder='Password' className='form-field' />
          
          {/* if errors exist then password error will show up that is if password was touched */}

          {touched.password && errors.password && ( <p className='error'>{errors.password}</p>  )}
           <button disabled={isSubmitting} type='submit'>Submit</button> 

           <label className="checkbox-container">
                    Accept confidentiality agreement?
            <Field type="checkbox" name="tos" checked={values.tos} />
             <span className="checkmark" />
            </label>
        </Form>
        
        
      </div>
    );
  
};

//Higher order component-->passing in what to do when the form gets submitted
const FormikMyForm = withFormik({

//returns objects , key value pairs

    mapPropsToValues({ username, password }) {
      return {
        username: username || '',
        password: password || ''
      };
    },
  //Yup validation Schema is used for data validation and errors are mapped to iner component errors meaning its keys should match those of values
    validationSchema: Yup.object().shape({
      username: Yup.string() .required('Username is required').min(6, 'Username must be at least 5 characters long.'),
      password: Yup.string().min(6, 'Password must be at least 6 characters long.').required('Password is required'),
    }),
  
    handleSubmit(values, { setStatus, setErrors, resetForm }) {
    //when the values get submitted then we send the data to the API and the form resets itself

      if (values.username === "Mannyyy") {
        setErrors({ username: "That username is already taken by someone else" });
      } else {
        // saving data to the server using axios
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
