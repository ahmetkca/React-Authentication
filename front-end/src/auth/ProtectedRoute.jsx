import React from "react";

import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = ({ redirectPath = "/login", children }) => {
    const user = null;
    return user ? (
        <>
            {children ? children : <Outlet />}
        </>
    ) : (
        <Navigate to={redirectPath} replace />
    );
}