import React, { useState, useEffect } from "react";
import UserService from "../store/services/user.service";


const PaitentsBoard = () => {
  const [content, setContent] = useState([]);
  const [patients, setPatients] = useState([]);
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    UserService.getPatientsBoard().then(
      (response) => {
        setContent(response.data);
        setPatients(response.data.datas)
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
  return (
    <>
      <div className="row">
        <div className="col-12 col">
          <div className="page-title-box d-flex align-items-start align-items-center justify-content-between">
            <h4 className="page-title mb-0 font-size-18">Patients</h4>
            <div className="page-title-right">
              {/* <ol className="breadcrumb m-0">
                <li className="breadcrumb-item">
                  <a href="/dashboard2">Dashboard</a>
                </li>
                <li className="active breadcrumb-item" aria-current="page">
                  <a href="/dashboard2">Dashboard 2</a>
                </li>
              </ol> */}
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-body">
              <div className="h4 card-title">Responsive tables </div>
              <p className="card-title-desc">Create responsive tables by wrapping any <code>.table</code> in <code>.table-responsive</code>to make them scroll horizontally on small devices (under 768px).</p>
              <div className="table-responsive">
                <table className="table mb-0 table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>image</th>
                      <th>name</th>
                      <th>surname</th>
                      <th>age</th>
                      <th>birthday</th>
                      <th>booldType</th>
                      <th>createdBy</th>
                      <th>email</th>
                      <th>gender</th>
                      <th>registrationTime</th>
                    </tr>
                  </thead>
                  <tbody>
                    {patients.map((patient) => {
                      return (
                        <tr key={patient.id}>
                          <th scope="row">{counter}</th>
                          <td>{patient.image}</td>
                          <td>{patient.name}</td>
                          <td>{patient.surname}</td>
                          <td>{patient.age}</td>
                          <td>{patient.birthday}</td>
                          <td>{patient.bloodType}</td>
                          <td>{patient.createdBy}</td>
                          <td>{patient.email}</td>
                          <td>{patient.gender.name}</td>
                          <td>{patient.registrationTime}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default PaitentsBoard;
