import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios'; // Import axios

const validationSchema = Yup.object().shape({
  email: Yup.string().required('ⓘ Email is required')
});
function Forgot() {
    const[loading,setLoading]=useState(false);
    const navigate =useNavigate();
    const initialvalues = {
        email: '',
      };
  return (
    <div className="container">
        <div className="row">
           <div className="col">
           <h1 className='text-center app-heading m-2'>NotesApp</h1>
           </div>
           
        </div>
        <div className="row">
        <div className="col-12 shadow-sm p-3 mb-5 bg-white rounded details-home">
          
          <Formik
            initialValues={initialvalues}
            validationSchema={validationSchema}
            onSubmit={(values, actions) => {
              console.log(values);
              setLoading(true)
              try {
                let data =  axios.post('https://notes-be-r40t.onrender.com/forgotpassword', values);
                if (data) {
                  console.log(data);
                  toast("Email Sent");
                  actions.resetForm();actions.setSubmitting(false);
                  setLoading(false)
                  navigate('/login')
                }
              } catch (error) {
                if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                  toast.error('Email Not Found');
                  actions.setSubmitting(false);
                }
              }
            }}
          >
            {(formikProps) => (
              <Form className='form'>
                <h1 className='home-abt text-black text-center'>Forgot Password</h1>
                <br></br>
                <div>
                  <Field type="email" className='reg-input form-control' id="email" name="email" placeholder='Email' />
                  <ErrorMessage name="email" component="div" className='errormessage' />
                </div>
                <p> </p>
                <div className='row'>
                  <br />
                  <button className='btn btn-success col log-btn' type="submit" disabled={formikProps.isSubmitting}>
                  {loading ? (
                        <span className="spinner-border text-light mx-2"></span>
                      ) : (
                        "Reset Password"
                      )}
                  </button>
                  <Link className='btn btn-danger col log-btn' to='/login'>
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

export default Forgot