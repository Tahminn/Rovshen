import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { register } from "../../store/slices/auth";
import { clearMessage } from "../../store/slices/message";
import { Link, useNavigate } from "react-router-dom";

function ReceptionistCreate() {

    const [successful, setSuccessful] = useState(false);
    const { message } = useSelector((state) => state.message);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(clearMessage());
    }, [dispatch]);
    const initialValues = {
        username: "",
        email: "",
        password: "",
    };
    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .test(
                "len",
                "The username must be between 3 and 20 characters.",
                (val) =>
                    val &&
                    val.toString().length >= 3 &&
                    val.toString().length <= 20
            )
            .required("This field is required!"),
        email: Yup.string()
            .email("This is not a valid email.")
            .required("This field is required!"),
        password: Yup.string()
            .test(
                "len",
                "The password must be between 6 and 40 characters.",
                (val) =>
                    val &&
                    val.toString().length >= 6 &&
                    val.toString().length <= 40
            )
            .required("This field is required!"),
    });
    const handleRegister = (formValue) => {
        const { username, email, password } = formValue;
        setSuccessful(false);
        dispatch(register({ username, email, password }))
            .unwrap()
            .then(() => {
                setSuccessful(true);
                navigate("/receptionists/list");
            })
            .catch(() => {
                setSuccessful(false);
            });
    };

    return (
        <>
            <div className="ReactTable -striped -highlight w-25 my-3">
                <div className="pagination-bottom">
                    <div className="-pagination">
                        <div className="-previous"><Link to="/receptionists/list" className="-btn">
                            Go to list
                        </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-12 signup-form">
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleRegister}
                >
                    <Form>
                        {!successful && (
                            <div>
                                <div className="form-group">
                                    <label htmlFor="username">Username</label>
                                    <Field name="username" type="text" className="form-control" />
                                    <ErrorMessage
                                        name="username"
                                        component="div"
                                        className="alert alert-danger"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <Field name="email" type="email" className="form-control" />
                                    <ErrorMessage
                                        name="email"
                                        component="div"
                                        className="alert alert-danger"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <Field
                                        name="password"
                                        type="password"
                                        className="form-control"
                                    />
                                    <ErrorMessage
                                        name="password"
                                        component="div"
                                        className="alert alert-danger"
                                    />
                                </div>
                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary btn-block my-3 w-100">Create</button>
                                </div>
                            </div>
                        )}
                    </Form>
                </Formik>
                {message && (
                    <div className="form-group">
                        <div
                            className={successful ? "alert alert-success" : "alert alert-danger"}
                            role="alert"
                        >
                            {message + "Please, verify your email address before login"}
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default ReceptionistCreate