import { Routes, Route } from 'react-router-dom';
import React from 'react';
import { Layout } from './Layout';

import UserInfoPage from '../pages/UserInfoPage';
import LogInPage from '../pages/LogInPage';
import SignUpPage from '../pages/SignUpPage';
import { ProtectedRoute } from '../auth/ProtectedRoute';

export const MyRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />} >
                <Route 
                    index 
                    element={
                        <ProtectedRoute>
                            <UserInfoPage />
                        </ProtectedRoute>} />
                <Route path='login' element={<LogInPage />} />
                <Route path='signup' element={<SignUpPage />} />
                <Route path='*' element={<div>Page not found</div>} />
            </Route>
        </Routes>

    )
}

export default MyRoutes;