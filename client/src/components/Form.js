import React, { useState, useEffect } from 'react';
import { Form, Field, withFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';


//objects with key value pairs down below...
const MyForm = ({ touched,errors,status,isSubmitting,values}) => {

  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    if (status) {
        //SetRecipes could be the same as setstate which is all the same just a function  and we're setting the state as status???
      setRecipes([...status]);
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
                   
            <Field type="checkbox" name="tos" checked={values.tos} />
             <span className="checkmark" />
             <p className="p"> Accept Terms of Service </p>
             <h6>Failurre to cmply to our rules and regulations would cost you dearly. Make hay while the sun shines  and do the right thing</h6>
            </label>
        </Form>

    {/* mapping over array of function to recive data back from recipe */}
        <p className="yes">RECIPES:</p>{
            recipes ? recipes.map(recipe => (

                <p  className ="card" key={Date.now() + Math.random(10000)}> Name : {recipe.name} Course : {recipe.course} </p>
              
              )
              )
            : null}
        
        
        
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
    validationSchema: Yup.object().shape({username:Yup.string().required('Username is required').min(6, 'Username must be at least 5 characters long.'),password:Yup.string().min(6, 'Password must be at least 6 characters long.').required('Password is required'),
    }),
    handleSubmit(values, { setSubmitting, setStatus, setErrors, resetForm }) {
    //when the values get submitted then we send the data to the API and the form resets itself

      if (values.username === "Mannyyy") {
        setErrors({ username: "That username is already taken by someone else" });
      } else {

        // saving data to the server using axios
        axios
        .post("http://localhost:5000/api/register", values)
        .then(res => {
          resetForm();//resetform helps the form to reset itself after we input data into it
          setStatus(res.data);
          console.log(res.data);
          setSubmitting(true);
        })
        .catch(err => {
          console.log(err);
          setSubmitting(false);
        })


        //recieving list of recipes from server using the .get axios method?
        axios
      .get("http://localhost:5000/api/restricted/data")
      .then(response => {
        setStatus(response.data);//response data from axios get request(array)
        console.log(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
           
      }
    }
  })(MyForm);
  
  export default FormikMyForm;
