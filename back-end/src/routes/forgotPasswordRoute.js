import { getDbConnection } from '../db';
import { CognitoUser } from 'amazon-cognito-identity-js';
import { awsUserPool } from '../utils/auth/aws/awsUserPool';

export const forgotPasswordRoute = {
    path: '/api/forgot-password',
    method: 'PUT',
    handler: async (req, res) => {

        const { email } = req.body;

        new CognitoUser({ Username: email, Pool: awsUserPool })
            .forgotPassword({
                onSuccess: async (data) => {
                    console.trace(data);
                    return res.status(200).json({ message: 'Forgot password email sent' });
                },
                onFailure: (err) => {
                    console.trace(err);
                    return res.status(500).json({ error: err.message });
                }
            });
    }
}
