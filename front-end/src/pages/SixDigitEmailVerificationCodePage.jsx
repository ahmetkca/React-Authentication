import { useState } from "react";
import axios from "axios";
import EmailVerificationSuccess from "../components/EmailVerificationSuccess";
import EmailVerificationFail from "../components/EmailVerificationFail";
import { useJwtToken } from "../auth/useJwtToken";

import { useSearchParams } from "react-router-dom";

const SixDigitEmailVerificationCodePage = () => {
    const [isSuccess, setIsSuccess] = useState(false);
    const [isFail, setIsFail] = useState(false);

    const [verificationString, setVerificationString] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const [searchParams] = useSearchParams();

    const [, setJwtToken, clearJwtToken] = useJwtToken();
    const email = searchParams.get("email");

    const onSubmitVerify = async () => {
        setIsLoading(true);
        try { 
            const response = await axios.put(`http://localhost:8080/api/verify-email`, {
                email,
                verificationToken: verificationString
            });
            const { token } = response.data;
            clearJwtToken();
            setJwtToken(token);
            setIsSuccess(true);
        } catch (error) {
            setIsFail(true);
            console.log(error);
        }
        setIsLoading(false);
    }

    if (isSuccess) {
        return <EmailVerificationSuccess />;
    }

    if (isFail) {
        return <EmailVerificationFail />;
    }

    return (
        <div className="content-container">
            <h1>Verify your email</h1>
            <p>Please enter the 6-digit code we sent to {email}</p>
            <input
                type="text"
                value={verificationString}
                onChange={(e) => setVerificationString(e.target.value)}
                placeholder="6-digit code"
            />
            <button
                onClick={async () => { await onSubmitVerify(); }}
                className="button"
            >
                Verify
            </button>
        </div>
    )

}

export default SixDigitEmailVerificationCodePage;
