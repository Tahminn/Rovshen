import React from 'react'
import { Link } from "react-router-dom"
import avatar2 from "../../assets/images/users/avatar-3.jpg"
import SidebarContent from './SidebarContent'
import { useSelector } from "react-redux";
import jwt_decode from "jwt-decode";

function Sidebar() {
  const { user: currentUser } = useSelector((state) => state.auth);
  var userr = jwt_decode(currentUser.accessToken);

  return (
    <React.Fragment>
      <div className="vertical-menu">
        <div className="h-100">
          <div className="user-wid text-center py-4">
            <div className="user-img">
              <img src={avatar2} alt="" className="avatar-md mx-auto rounded-circle" />
            </div>
              <div className="mt-3">
                <Link to="/" className="text fw-medium font-size-16">{userr.given_name}</Link>
                <p className="text-body mt-1 mb-0 font-size-13">{currentUser.roles[0]}</p>
              </div>
            </div>
            <div data-simplebar className="h-100">
            <SidebarContent />
          </div>
          </div>
        </div>
    </React.Fragment>
  )
}

export default Sidebar