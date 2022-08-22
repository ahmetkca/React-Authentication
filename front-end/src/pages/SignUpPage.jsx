import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useJwtToken } from "../auth/useJwtToken";
import axios from "axios";

export const SignUpPage = () => {
    const [jwtToken, setJwtToken, clearJwtToken] = useJwtToken();

    const navigate = useNavigate();

    const renderCount = useRef(0);
    renderCount.current = renderCount.current + 1;

    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [verifyPasswordValue, setVerifyPasswordValue] = useState("");

    const verifyPassword = () => {
        if (password.length > 0 && verifyPasswordValue.length > 0 && password === verifyPasswordValue) {
            return true;
        }
        return false;
    }

    const onSignUp = async (e) => {
        e.preventDefault();
        if (verifyPassword()) {
            try {
                const response = await axios.post("http://localhost:8080/api/signup", {
                    email: username,
                    password
                });
                const { token: jwtToken } = response.data;
                console.log(`jwtToken: ${jwtToken}`);
                setJwtToken(jwtToken);
                navigate("/please-verify");
            } catch (error) {
                setShowErrorMessage(true);
                setErrorMessage(error.response.data.error);
            }
        }
    }

    

    return (
        <div>
            { showErrorMessage && <div className="fail">{errorMessage}</div> }
            <h1>Sign Up (Total render and re-renders: {renderCount.current})</h1>
            {showErrorMessage && <div className="fail">Uh oh... something went wrong and we couldn't sign you up.</div>}
            <form onSubmit={(e) => onSignUp(e)}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" className="form-control" id="username" placeholder="Username"
                        onChange={(e) => {
                            setUsername(e.target.value);
                        }}
                        />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" placeholder="Password"
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }} />
                </div>
                <div className="form-group">
                    <label htmlFor="password-verify">Password</label>
                    <input type="password" className="form-control" id="password-verify" placeholder="Password"
                        onChange={(e) => {
                            setVerifyPasswordValue(e.target.value);
                        }} />
                </div>
                <hr />
                <button 
                    disabled={!(verifyPassword() && username.length > 0 && password.length > 0)}
                    type="submit" className="btn btn-primary" >Sign Up</button>
                <button type="button" className="btn btn-secondary" 
                    onClick={() => navigate('/forgot-password')}>Forgot your password ? </button>
                <button type="button" className="btn btn-secondary"
                    onClick={() => navigate('/login')}>Already have an account? Log In</button>
            </form>
        </div>
    );
}

export default SignUpPage;