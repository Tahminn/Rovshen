import { useState } from 'react'
import { Route, Navigate, Outlet, useLocation } from 'react-router-dom'
import { useSelector } from "react-redux";
import jwt_decode from "jwt-decode";

function ProtectedRoute() {
    const { user: currentUser } = useSelector((state) => state.auth);
    console.log(currentUser);
    const user_permissions = currentUser ? jwt_decode(currentUser.accessToken).Permission : [""];
    const location = useLocation();
    user_permissions?.includes(location);
    return currentUser
        ? user_permissions?.includes(location.pathname)
            ? <Outlet />
            : <Navigate to="/unauthorized" state={{ from: location }} replace />
        : <Navigate to="/login" state={{ from: location }} replace />

}

export default ProtectedRoute;