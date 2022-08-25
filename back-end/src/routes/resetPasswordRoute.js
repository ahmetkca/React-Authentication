import { CognitoUser } from "amazon-cognito-identity-js";
import { awsUserPool } from "../utils/auth/aws/awsUserPool";

export const resetPasswordRoute = {
    path: '/api/reset-password',
    method: 'PUT',
    handler: async (req, res) => {
        const { verificationToken, newPassword, email } = req.body;
        
        
        new CognitoUser({ Username: email, Pool: awsUserPool })
            .confirmPassword(verificationToken, newPassword, {
                onSuccess: async (data) => {
                    console.trace(data);
                    return res.status(200).json({ message: 'Password reset successful' });
                },
                onFailure: (err) => {
                    console.trace(err);
                    return res.status(500).json({ error: err.message });
                }
            });
    }
}