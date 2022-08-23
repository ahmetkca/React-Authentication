import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { useJwtToken } from "../auth/useJwtToken";
import EmailVerificationSuccess from "../components/EmailVerificationSuccess";
import EmailVerificationFail from "../components/EmailVerificationFail";

export const EmailVerificationLandingPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [ isVerified, setIsVerified ] = useState(false);
    const [ isError, setIsError ] = useState(false);
    const [ errorMessage, setErrorMessage ] = useState("");
    const { verificationToken } = useParams();
    const [, setJwtToken, clearJwtToken] = useJwtToken();

    useEffect(() => {
        console.log(verificationToken);
        (async function() {
            const verifyEmail = async () => {
                try {
                    const response = await axios.put(`http://localhost:8080/api/verify-email`, {
                        verificationToken
                    });
                    const { token } = response.data;
                    console.log(response.data);
                    clearJwtToken();
                    setJwtToken(token);
                    setIsVerified(true);
                    setIsError(false);
                } catch (error) {
                    console.log(error);
                    setIsVerified(false);
                    setIsError(true);
                    setErrorMessage(error.response.data.error);
                }
                setIsLoading(false);
            }
            setTimeout(async () => {
                await verifyEmail();
            }, 1000);
        })();  
    } , []);



    if (isLoading) return <div>Verifying Email...</div>;
    if (isVerified) return <EmailVerificationSuccess />;
    return (
        <>
            {isError ? <div className="fail">{errorMessage}</div> : null}
            <EmailVerificationFail />
        </>
    );
}

export default EmailVerificationLandingPage;
