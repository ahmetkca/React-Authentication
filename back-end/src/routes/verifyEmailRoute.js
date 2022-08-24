import { ObjectId } from 'mongodb';
import { getDbConnection } from '../db';
import jwt from 'jsonwebtoken';
import { CognitoUser } from 'amazon-cognito-identity-js';
import { awsUserPool } from '../utils/auth/aws/awsUserPool';

let g_count = 10;

export const verifyEmailRoute = {
    path: '/api/verify-email',
    method: 'PUT',
    handler: async (req, res) => {
        const { verificationToken, email } = req.body;

        console.log(`verify-email endpoint called with verificationToken: ${verificationToken}`);
        
        new CognitoUser({ Username: email, Pool: awsUserPool })
            .confirmRegistration(verificationToken, true, async (err) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ error: err });
                }

                const db = getDbConnection('react-auth-db');
                const updateResult = await db.collection('users').updateOne(
                    { email },
                    { $set: { isVerified: true } }
                );

                if (updateResult.modifiedCount === 0) {
                    return res.status(404).json({ error: 'Verification was incorrect or Email is already verified' });
                }

                const user = await db.collection('users').findOne({ email });
                const {
                    _id: userId,
                    email: userEmail,
                    info: userInfo,
                    isVerified: isVerified,
                } = user;

                console.log(`
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
                        return res.status(500).json({ error: 'Error signing verification token' });
                    }
                    return res.status(200).json({ token });
                });
            });
        
    }
}
