import { Routes, Route } from 'react-router-dom';
import React from 'react';
import { Layout } from './Layout';

import UserInfoPage from '../pages/UserInfoPage';
import LogInPage from '../pages/LogInPage';
import SignUpPage from '../pages/SignUpPage';
import { ProtectedRoute } from '../auth/ProtectedRoute';
import { VerifyEmail } from '../pages/VerifyEmail';
import EmailVerificationLandingPage from '../pages/EmailVerificationLandingPage';
import ForgotPasswordPage from '../pages/ForgotPasswordPage';

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
                <Route path="forgot-password" element={<ForgotPasswordPage />} />
                <Route path="verify-email/:verificationToken" element={<EmailVerificationLandingPage />} />
                <Route path="please-verify" element={<VerifyEmail />} />
                <Route path='login' element={<LogInPage />} />
                <Route path='signup' element={<SignUpPage />} />
                <Route path='*' element={<div>Page not found</div>} />
            </Route>
        </Routes>

    )
}

export default MyRoutes;
