import { useState } from 'react'
import { Route, Navigate, Outlet, useLocation } from 'react-router-dom'
import { useSelector } from "react-redux";
import jwt_decode from "jwt-decode";

function PrivateRoute() {
    const { user: currentUser } = useSelector((state) => state.auth);
    const user_permissions = currentUser ? currentUser.roles : [""];

    return currentUser
        ? user_permissions?.includes("SuperAdmin")
            ? <Outlet />
            : <Navigate to="/unauthorized" state={{ from: location }} replace />
        : <Navigate to="/login" state={{ from: location }} replace />
}

export default PrivateRoute