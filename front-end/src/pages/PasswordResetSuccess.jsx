import { useNavigate } from "react-router-dom";


export const PasswordResetSuccess = () => {
    const navigate = useNavigate();

    return (
        <div>
            <h1>Password Reset Success</h1>
            <p>Your password has been reset. You can now log in with your new password.</p>

            <button onClick={() => navigate("/login")}>Log In</button>
        </div>
    )
}

export default PasswordResetSuccess;