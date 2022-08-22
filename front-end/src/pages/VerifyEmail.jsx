import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useTimer } from "../hooks/useTimer";

export const VerifyEmail = () => {
    const navigate = useNavigate();
    const timeLeft = useTimer(5);

    useEffect(() => {
        setTimeout(() => {
            navigate("/");
        } , 5100);
    } , []);

    return (
        <div className="content-container">
            <h1>Thanks for Signing Up!</h1>
            <p>Please check your email to verify your account.</p>
            <p>Redirecting to the home page in {timeLeft}</p>
        </div>
    );
}