import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const LogInPage = () => {
    const navigate = useNavigate();

    const userNameInput = useRef();
    const passwordInput = useRef();
    const onLogIn = async (e) => {
        e.preventDefault();
        console.log(userNameInput.current.value);
        console.log(passwordInput.current.value);
        alert("Log In functionality not yet implemented");
    }

    const [showErrorMessage, setShowErrorMessage] = useState(false);


    return (
        <div>
            <h1>Log In</h1>
            {showErrorMessage && <div className="fail">Uh oh... something went wrong and we couldn't log you in.</div>}
            <form onSubmit={(e) => onLogIn(e)}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input ref={userNameInput} type="text" className="form-control" id="username" placeholder="Username"
                        onChange={(e) => {
                            userNameInput.current.value = e.target.value;
                        }} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input ref={passwordInput} type="password" className="form-control" id="password" placeholder="Password"
                        onChange={(e) => {
                            passwordInput.current.value = e.target.value;
                        }} />
                </div>
                <hr />
                <button 
                    disabled={ !(userNameInput.current?.value && passwordInput.current?.value)}
                    type="submit" className="btn btn-primary" >Log In</button>
                <button type="button" className="btn btn-secondary" 
                    onClick={() => navigate('/forgot-password')}>Forgot your pasword?</button>
                <button type="button" className="btn btn-secondary"
                    onClick={() => navigate('/signup')}>Don't have an account? Sign Up</button>
            </form>
        </div>
    );
}

export default LogInPage;