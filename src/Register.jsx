import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link,  useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const validationSchema = Yup.object().shape({
  firstname: Yup.string().required('ⓘ First Name is required'),
  lastname: Yup.string().required('ⓘ Last Name is required'),
  email: Yup.string().email('ⓘ Invalid email format').required('ⓘ Email is required'),
  password: Yup.string().required('ⓘ Password is required'),
});
function Register() {
    const [loading,setLoading]=useState(false)
    const navigate = useNavigate();

  async function handleSubmit(values) {
    try {
      await axios.post('', values);
      toast.success('Registration Successful');
      
    } catch (error) {
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        toast.error('User Already Exists');
      }
    }
  }

  const initialValues = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  };

  return (
    <div className="container">
        <div className="row">
           <div className="col">
           <h1 className='text-center app-heading m-2'>NotesApp</h1>
           </div>
        </div>
        <div className="row">
            <div className="col card home-card shadow-lg p-3 mb-5 bg-body-tertiary rounded">
            <h1 className='text-center text-black home-abt'>Register</h1>
            <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values, actions) => {
                setLoading(true);
                try {
                    await axios.post('https://notes-be-r40t.onrender.com/register', values);
                    toast.success('Registration Successful');
                    actions.resetForm();
                    navigate('/login');
                    actions.setSubmitting(false);
                  } catch (error) {
                    if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                      toast.error('User Already Exists');
                      actions.setSubmitting(false);
                    }
                  }
              
            }}>
            {(formikProps) => (
              <Form className='form'>
                <div>
                  <Field
                    className='reg-input form-control'
                    type="text"
                    id="firstname"
                    name="firstname"
                    placeholder='First Name'
                  />
                  <ErrorMessage name="firstname" component="div" className='errormessage' />
                </div>
                <p> </p>
                <div>
                  <Field
                    className='reg-input form-control'
                    type="text"
                    id="lastname"
                    name="lastname"
                    placeholder='Last Name'
                  />
                  <ErrorMessage name="lastname" component="div" className='errormessage' />
                </div>
                <p> </p>
                <div>
                  <Field
                    type="email"
                    className='reg-input form-control'
                    id="email"
                    name="email"
                    placeholder='Email'
                  />
                  <ErrorMessage name="email" component="div" className='errormessage' />
                </div>
                <p> </p>
                <div>
                  <Field
                    type="password"
                    id="password"
                    className='reg-input form-control'
                    name="password"
                    placeholder='Password'
                  />
                  <ErrorMessage name="password" component="div" className='errormessage' />
                </div>
                <p> </p>
                <div className='row'>
                  <br />
                  <button className='btn btn-success col log-btn' type="submit" disabled={formikProps.isSubmitting}>
                  {loading ? (
                        <span className="spinner-border text-light mx-2"></span>
                      ) : (
                        "Register"
                      )}
                  </button>
                  <Link className='btn btn-danger col log-btn' to='/'>
                    Back
                  </Link>
                </div>
              </Form>
            )}
          </Formik>
            </div>
        </div>
    </div>
  )
}

export default Register