
import { useNavigate } from "react-router-dom"

export const PasswordResetFail = ({ errorMessage }) => {

    const navigate = useNavigate();

    return (
        <div>
            <div className="fail">{errorMessage}</div>
            <h1>Password Reset Failed</h1>
            <p>Your password reset failed. Please try again.</p>
            <button onClick={() => navigate("/login")}>Log In</button>
        </div>
    )
}

export default PasswordResetFail;