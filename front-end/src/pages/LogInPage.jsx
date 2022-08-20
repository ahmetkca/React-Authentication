import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../auth/useUser";
import { useJwtToken } from "../auth/useJwtToken";
import axios from "axios";

export const LogInPage = () => {
    const navigate = useNavigate();

    const [ _, setJwtToken] = useJwtToken();

    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const onLogIn = async (e) => {
        e.preventDefault();
        console.log(`email: ${email}`);
        console.log(`password: ${password}`);

        try {
            const response = await axios.post("http://localhost:8080/api/login", {
                email,
                password
            });
            const { token: jwtToken } = response.data;
            console.log(`jwtToken: ${jwtToken}`);
            setJwtToken(jwtToken);
            navigate("/");
        } catch (error) {
            setShowErrorMessage(true);
            console.log(error);
            setErrorMessage(error.response.data.error);
        }
    }


    return (
        <div>
            <h1>Log In</h1>
            {showErrorMessage && <div className="fail">
                Uh oh... something went wrong and we couldn't log you in.
                <br />
                Error: {errorMessage}
            </div>}
            <form onSubmit={(e) => onLogIn(e)}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" className="form-control" id="username" placeholder="Username"
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" placeholder="Password"
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }} />
                </div>
                <hr />
                <button 
                    disabled={!(email.length > 0 && password.length > 0)}
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