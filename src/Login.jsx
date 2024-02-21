import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { toast } from "react-toastify";

const validationSchema = Yup.object().shape({
  email: Yup.string().required("ⓘ Email is required"),
  password: Yup.string().required("ⓘ Password is required"),
});

function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const initialvalues = {
    email: "",
    password: "",
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h1 className="text-center app-heading m-2">NotesApp</h1>
        </div>
      </div>

      <div>
        <div className="row ">
          <div className="col card home-card shadow-lg p-3 mb-5 bg-body-tertiary rounded-2 w-25">
            <br />
            <h1 className="text-center text-black home-abt">Login</h1>
            <Formik
              initialValues={initialvalues}
              validationSchema={validationSchema}
              onSubmit={async (values, actions) => {

            setLoading(true);
                try {
                  let data = await axios.post(
                    "https://notes-be-r40t.onrender.com/login",
                    values
                  );
                  console.log(data);
                  let token = data.data.token;
                  console.log(token);
                  if (token) {
                    console.log(token);
                    localStorage.setItem("token", token);
                    setLoading(false)
                    navigate("/view");
                  }
                  toast.success("Login Successful");
                  actions.resetForm();
                  navigate("/view");
                  actions.setSubmitting(false);
                } catch (error) {
                  if (
                    error.response &&
                    error.response.status >= 400 &&
                    error.response.status <= 500
                  ) {
                    toast.error("Incorrect User Login");
                    actions.setSubmitting(false);
                  }
                }
              }}
            >
              {(formikProps) => (
                <Form className="form">
                  <br />{" "}
                  <div>
                    <Field
                      type="email"
                      className="reg-input form-control"
                      id="email"
                      name="email"
                      placeholder="Email"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="errormessage"
                    />
                  </div>
                  <p> </p>
                  <div>
                    <Field
                      type="password"
                      id="password"
                      className="reg-input form-control"
                      name="password"
                      placeholder="Password   "
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="errormessage"
                    />
                  </div>
                  <p> </p>
                  <h6>
                    <Link to="/forgotpassword" className="fp-btn ">
                      Forgot password?
                    </Link>
                    &ensp;&ensp;&ensp;
                    <Link to="/forgotpassword" className="fp-btn text-black">
                      New here? Get started
                    </Link>
                  </h6>
                  <br />
                  <div className="row">
                    <br />
                    <button
                      className="btn btn-success col log-btn"
                      type="submit"
                      disabled={formikProps.isSubmitting}
                    >
                      {loading ? (
                        <span className="spinner-border text-light mx-2"></span>
                      ) : (
                        "Login"
                      )}
                    </button>

                    <Link className="btn btn-danger col log-btn" to="/">
                      Back
                    </Link>
                  </div>
                  <button
                    type="button"
                    className="btn btn-info text-center"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    Demo Credentials
                  </button>
                  <div
                    className="modal fade"
                    id="exampleModal"
                    tabIndex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h1
                            className="modal-title fs-5"
                            id="exampleModalLabel"
                          >
                            <h2> Demo Login Data</h2>
                          </h1>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div className="modal-body">
                          <h6>Email: vimalkarthik315@gmail.com</h6>
                          <br />
                          <h6>Password: Vk1234</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
