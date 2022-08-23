import { useNavigate } from "react-router-dom";

export const EmailVerificationFail = () => {

    const navigate = useNavigate();

    return (
        <div className="content-container">
            <h1>Sorry!</h1>
            <p>Your email could not be verified. Please try again later.</p>
            <button onClick={() => navigate("/signup")} className="button">
                Go to sign up page
            </button>
        </div>
    );

}
export default EmailVerificationFail;