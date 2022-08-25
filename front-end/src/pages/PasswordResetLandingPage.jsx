import { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import PasswordResetFail from "./PasswordResetFail";
import PasswordResetSuccess from "./PasswordResetSuccess";


export const PasswordResetLandingPage = () => {
    const [searchParams] = useSearchParams();
    const email = searchParams.get("email");
    const [passwordValue, setPasswordValue] = useState("");
    const [confirmPasswordValue, setConfirmPasswordValue] = useState("");
    const [verificationToken, setVerificationToken] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const [isFail, setIsFail] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (passwordValue !== confirmPasswordValue) {
            return setPasswordChangeSuccessful(false);
        }
        try {
            const response = await axios.put(`http://localhost:8080/api/reset-password`, {
                verificationToken,
                newPassword: passwordValue,
                email
            });
            setIsSuccess(true);
        } catch (error) {
            console.error(error);
            setErrorMessage(error.response.data.error);
            setIsFail(true);
        }
    }

    if (isSuccess) return <PasswordResetSuccess />;
    if (isFail) return <PasswordResetFail errorMessage={errorMessage} />;

    return (
        <div>
            <h1>Password Reset</h1>
            <p>Enter your new password.</p>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="password">New Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={passwordValue}
                        onChange={(e) => setPasswordValue(e.target.value)}
                        className="form-control"
                        placeholder="Enter your new password" />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm New Password:</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={confirmPasswordValue}
                        onChange={(e) => setConfirmPasswordValue(e.target.value)}
                        className="form-control"
                        placeholder="Confirm your new password" />
                </div>
                <div className="form-group">
                    <label htmlFor="verificationToken">Password Reset Verification Token</label>
                    <input
                        type="text"
                        name="verificationToken"
                        value={verificationToken}
                        onChange={(e) => setVerificationToken(e.target.value)}
                        className="form-control"
                        placeholder="Enter your password reset verification token." />
                </div>
                <div className="form-group">
                    {passwordValue}
                    {confirmPasswordValue}
                    <button
                        disabled={verificationToken === "" || passwordValue === "" || passwordValue !== confirmPasswordValue}
                        type="submit" className="btn btn-primary">Reset Password</button>
                </div>
            </form>
        </div>
    );
}

export default PasswordResetLandingPage;
