import { useNavigate } from "react-router-dom";

export const EmailVerificationSuccess = () => {

    const navigate = useNavigate();

    return (
        <div className="content-container">
            <h1>Success!</h1>
            <p>Your email has been verified. You can now log in.</p>
            <button onClick={() => navigate("/")} className="button">
                Go to home page
            </button>
        </div>
    );

}
export default EmailVerificationSuccess;