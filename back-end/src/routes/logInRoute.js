import jwt from 'jsonwebtoken';
import { 
    AuthenticationDetails,
    CognitoUserPool,
    CognitoUserAttribute,
    CognitoUser,
} from 'amazon-cognito-identity-js';
import { awsUserPool } from '../utils/auth/aws/awsUserPool';
import { getDbConnection } from '../db';

// import { compareAsync } from '../utils/auth/bcryptCompareAsync';

export const logInRoute = {
    path: '/api/login',
    method: 'POST',
    handler: async (req, res) => {
        const { email, password } = req.body;

        new CognitoUser({ Username: email, Pool: awsUserPool })
            .authenticateUser(new AuthenticationDetails({ Username: email, Password: password }), {
                onSuccess: async (result) => {
                    const db = getDbConnection('react-auth-db');
                    const user = await db.collection('users').findOne({ email });
                    const {
                        _id: userId,
                        email: userEmail,
                        info: userInfo,
                        isVerified: isVerified,
                    } = user;

                    console.trace(`
                        logInRoute
                        userId: ${userId}
                        userEmail: ${userEmail} 
                        userInfo: ${userInfo}   
                        isVerified: ${isVerified}   
                        `);
                    
                    const resToken = jwt.sign({
                        userId,
                        email: userEmail,
                        info: { ...userInfo },
                        isVerified
                    }, process.env.JWT_SECRET, { expiresIn: '1d' }, (err, token) => {
                        if (err) {
                            return res.status(500).json({ error: 'Error signing user details to jwt' });
                        }
                        return res.status(200).json({ token });
                    } );
                },
                onFailure: (err) => {
                    console.trace(err);
                    return res.status(500).json({ error: err.message });
                }
            });
    }
}
