import { useState, useEffect, useReducer, useMemo } from "react";
import { useParams } from "react-router-dom";
import UserService from "../store/services/user.service";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";


function Permissions() {

    const { id } = useParams()

    const [content, setContent] = useState([]);
    const [roleClaims, setroleClaims] = useState([]);

    const initialValues = {
        roleId: id,
        roleClaims: [
            {
                type: "",
                value: "",
                selected: true
            }
        ],
    };

    const hamdlePermission = (formValue) => {
        console.log(formValue);
        const { roleId, roleClaims } = formValue;
        UserService.updatePermission({ roleId, roleClaims })
            .then(() => {
                alert("Succes")
            })
    };


    useEffect(() => {
        UserService.getPermission(id).then(
            (response) => {
                setContent(response.data);
                setroleClaims(response.data.roleClaims);
            },
            (error) => {
                const _content =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                setContent(_content);
            }
        );
    }, []);
    // console.log(content.roleClaims);

    return (
        <>
            <h1>Permissions</h1>
            <br />
            <div className="card">
                <div id="viewAll" className="card-body table-responsive">

                    {/* <Formik
                                initialValues={{    
                                    toggle: false,
                                    checked: [],
                                }}
                                onSubmit={async (values) => {
                                    await sleep(500);
                                    alert(JSON.stringify(values, null, 2));
                                }}
                            >
                                {({ values }) => (
                                    <Form>
                                        {/* 
            This first checkbox will result in a boolean value being stored. Note that the `value` prop
            on the <Field/> is omitted
          */}
                    {/* <label>
                                            <Field type="checkbox" name="toggle" />
                                            {`${values.toggle}`}
                                        </label> */}

                    {/* 
            Multiple checkboxes with the same name attribute, but different
            value attributes will be considered a "checkbox group". Formik will automagically
            bind the checked values to a single array for your benefit. All the add and remove
            logic will be taken care of for you.
          */}
                    {/* <div id="checkbox-group">Checked</div>
                                        <div role="group" aria-labelledby="checkbox-group">
                                            <label>
                                                <Field type="checkbox" name="checked" value="One" />
                                                One
                                            </label>
                                            <label>
                                                <Field type="checkbox" name="checked" value="Two" />
                                                Two
                                            </label>
                                            <label>
                                                <Field type="checkbox" name="checked" value="Three" />
                                                Three
                                            </label>
                                        </div>

                                        <button type="submit">Submit</button>
                                    </Form> */}
                    {/* )}
                            </Formik> */}
                    <Formik
                        initialValues={initialValues}
                        onSubmit={hamdlePermission}
                    >
                        <Form>
                            {roleClaims.map(function (perm, i) {
                                return (
                                    <div  role="group" className="row" key={i}>
                                        <div className="col-lg-4">
                                            <Field value={perm.type} name="type" type="text" className="form-control" disabled placeholder={perm.type} />
                                        </div>
                                        <div className="col-lg-4">
                                            <Field value={perm.value} name="value" type="text" className="form-control" disabled placeholder={perm.value} />
                                        </div>
                                        <div className="col-lg-4">
                                            <Field name="selected" id={i} type="checkbox" />
                                        </div>
                                    </div>
                                )
                            })}
                            <div className="form-group col-sm-12">
                                <button type="submit" className="btn btn-primary btn-block my-3 w-100">
                                    <i className="fa fa-check" />
                                    <span>Save</span>
                                </button>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div>
        </>
    )
}

export default Permissions