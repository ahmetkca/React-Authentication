import React from "react";

import { Navigate, Outlet } from "react-router-dom";

import { useUser } from "./useUser";

export const ProtectedRoute = ({ redirectPath = "/login", children }) => {
    const [user] = useUser();
    return user ? (
        <>
            {children ? children : <Outlet />}
        </>
    ) : (
        <Navigate to={redirectPath} replace />
    );
}