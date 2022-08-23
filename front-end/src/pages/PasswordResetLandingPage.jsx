import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PasswordResetFail from "./PasswordResetFail";
import PasswordResetSuccess from "./PasswordResetSuccess";


export const PasswordResetLandingPage = () => {
    const { passwordResetToken } = useParams();
    const [passwordValue, setPasswordValue] = useState("");
    const [confirmPasswordValue, setConfirmPasswordValue] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const [isFail, setIsFail] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (passwordValue !== confirmPasswordValue) {
            return setPasswordChangeSuccessful(false);
        }
        try {
            const response = await axios.put(`http://localhost:8080/api/reset-password`, {
                passwordResetToken,
                password: passwordValue
            });
            setIsSuccess(true);
        } catch (error) {
            console.error(error);
            setIsFail(true);
        }
    }

    if (isSuccess) return <PasswordResetSuccess />;
    if (isFail) return <PasswordResetFail />;

    return (
        <div>
            <h1>Password Reset</h1>
            <p>Enter your new password.</p>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={passwordValue}
                        onChange={(e) => setPasswordValue(e.target.value)}
                        className="form-control"
                        placeholder="Enter your new password" />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={confirmPasswordValue}
                        onChange={(e) => setConfirmPasswordValue(e.target.value)}
                        className="form-control"
                        placeholder="Confirm your new password" />
                </div>
                <div className="form-group">
                    <button
                        disabled={(!passwordValue || !confirmPasswordValue) && passwordValue !== confirmPasswordValue}
                        type="submit" className="btn btn-primary">Reset Password</button>   
                </div>
            </form>
        </div>
    );
}

export default PasswordResetLandingPage;
