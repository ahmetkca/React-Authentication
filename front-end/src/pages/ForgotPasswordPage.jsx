import { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

export const ForgotPasswordPage = () => {

    const [errorMessage, setErrorMessage] = useState("");
    const [isSuccessful, setIsSuccessful] = useState(false);
    const [email, setEmail] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put("http://localhost:8080/api/forgot-password", {
                email
            });
            setIsSuccessful(true);
            setErrorMessage("");
            setTimeout(() => {
                navigate("/login");
            }, 3000);
        } catch (error) {
            console.error(error);
            setErrorMessage(error.response.data.error);
        }
    }

    return isSuccessful ? (
        <div className="content-container">
            <h1>Password Reset Successful</h1>
            <p>Check your email for a password reset link.</p>
        </div>
    ) : (
        <div className="content-container">
            <h1>Forgot Password</h1>
            <p>Enter your email address and we'll send you a link to reset your password.</p>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input 
                        type="email" 
                        name="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        className="form-control" 
                        placeholder="Enter your email address to reset password" />
                </div>
                <div className="form-group">
                    <button 
                        disabled={!email}
                        type="submit" className="btn btn-primary">Reset Password</button>
                </div>
                {errorMessage ? <div className="fail">{errorMessage}</div> : null}  
            </form>
        </div>
    );
}

export default ForgotPasswordPage;
