import PropTypes from "prop-types"
import React, { useEffect, useRef, useState, useCallback } from "react"
import { useSelector } from "react-redux";
// Import Scrollbar
import SimpleBar from "simplebar-react"

// MetisMenu
import MetisMenu from "metismenujs"
import { withRouter } from "react-router-dom"
import { Link } from "react-router-dom"


//i18n
import { withTranslation } from "react-i18next"

function SidebarContent() {

    const [showPatientsBoard, setShowPatientsBoard] = useState(false);
    const [showProfileBoard, setShowProfileBoard] = useState(false);
    const [showDoctorsBoard, setShowDoctorsBoard] = useState(false);
    const [showNursesBoard, setShowNursesBoard] = useState(false);
    const [showReceptionistsBoard, setShowReceptionistsBoard] = useState(false);
    const { user: currentUser } = useSelector((state) => state.auth);
    // const dispatch = useDispatch();

    useEffect(() => {
        if (currentUser) {
            setShowPatientsBoard(true);
            setShowProfileBoard(true);
            setShowDoctorsBoard(true);
            setShowNursesBoard(true);
            setShowReceptionistsBoard(true);
        } else {
            setShowPatientsBoard(true);
            setShowProfileBoard(true);
            setShowDoctorsBoard(true);
            setShowNursesBoard(true);
            setShowReceptionistsBoard(true);
        }
    }, [currentUser]);

    const ref = useRef()

    useEffect(() => {
        ref.current.recalculate()
    }, []);

    return (
        <React.Fragment>
            <SimpleBar ref={ref} className="vertical-simplebar">
                <div id="sidebar-menu">
                    <ul className="metismenu list-unstyled" id="side-menu">
                        <li className="menu-title">Menu"</li>
                        <li>
                            <Link to="/dashboard" className="waves-effect">
                                <i className="mdi mdi-airplay"></i>
                                <span>Dashboard</span>
                            </Link>
                        </li>
                        <li>
                            {showPatientsBoard && (
                                <Link to="/profile" className="waves-effect">
                                    <i className="mdi mdi-airplay"></i>
                                    <span>Profile</span>
                                </Link>
                            )}
                        </li>
                        <li>
                            {showPatientsBoard && (
                                <Link to="/patients" className="waves-effect">
                                    <i className="mdi mdi-airplay"></i>
                                    <span>Patients</span>
                                </Link>
                            )}
                        </li>
                        <li>
                            {showDoctorsBoard && (
                                <Link to="/doctors/list" className="waves-effect">
                                    <i className="mdi mdi-airplay"></i>
                                    <span>Doctors</span>
                                </Link>
                            )}
                        </li>
                        <li>
                            {showNursesBoard && (
                                <Link to="/nurses/list" className="waves-effect">
                                    <i className="mdi mdi-airplay"></i>
                                    <span>Nurses</span>
                                </Link>
                            )}
                        </li>
                        <li>
                            {showReceptionistsBoard && (
                                <Link to="/receptionists/list" className="waves-effect">
                                    <i className="mdi mdi-airplay"></i>
                                    <span>Receptionists</span>
                                </Link>
                            )}
                        </li>
                        <li>
                            <Link to="/roles" className="waves-effect">
                                <i className="mdi mdi-airplay"></i>
                                <span>Roles</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </SimpleBar>
        </React.Fragment>
    )
}

export default SidebarContent