import { useState, useEffect, useReducer, useMemo } from "react";
import UserService from "../store/services/user.service";
import { Link } from "react-router-dom"
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

function Roles() {
    const [content, setContent] = useState([]);
    useEffect(() => {
        UserService.getRoles().then(
            (response) => {
                setContent(response.data);
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
                        <h4 className="page-title mb-0 font-size-18">Roles</h4>
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
                <div className="col-12"></div>
                <h1>Roles</h1>
                <br />
                <form method="post" asp-action="addrole" asp-controller="roles">
                    <div className="input-group">
                        <input name="roleName" className="form-control w-25" />
                        <span className="input-group-btn">
                            <button className="btn btn-info">Add New Role</button>
                        </span>
                    </div>
                </form>
                <table className="table table-striped" id="roleTable">
                    <thead>
                        <tr>
                            <th>
                                Role
                            </th>
                            <th>
                                Id
                            </th>
                            <th style={{ width: '10%' }}>
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {content.map(role => {
                            return (
                                <tr key={role.id}>
                                    <td>
                                        {role.name}
                                    </td>
                                    <td>
                                        {role.id}
                                    </td>
                                    {/* {role.name != "SuperAdmin" && */}
                                        <td className="text-right">
                                            <UncontrolledDropdown>
                                                <DropdownToggle caret>
                                                    Actions
                                                </DropdownToggle>
                                                <DropdownMenu>
                                                    <DropdownItem><button><i className="fas fa-trash-alt" /> Delete</button></DropdownItem>
                                                    <DropdownItem><Link to={`/permissions/${role.id}`}><i className="fas fa-wrench" /> Permission</Link></DropdownItem>
                                                </DropdownMenu>
                                            </UncontrolledDropdown>
                                        </td>
                                    {/* } */}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Roles