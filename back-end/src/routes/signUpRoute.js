import { CognitoUserAttribute } from "amazon-cognito-identity-js";
import { getDbConnection } from "../db";
import jwt from 'jsonwebtoken';
import { awsUserPool } from "../utils/auth/aws/awsUserPool";

export const signUpRoute = {
    path: '/api/signup',
    method: 'POST',
    handler: async (req, res) => {
        const { email, password } = req.body;

        const attributes = [
            new CognitoUserAttribute({ Name: 'email', Value: email }),
            // can add more attributes here such as name, profile picture, etc.
            // they will also have to be added on AWS Cognito User Pool
        ];

        awsUserPool.signUp(email, password, attributes, null, async (err, awsResult) => {
            if (err) {
                console.error(err.message);
                return res.status(500).json({ error: err.message });
            }

            const db = getDbConnection('react-auth-db');

            const defaultUserInfo = {
                hairColor: '',
                favoriteFood: '',
                bio: '' 
            }

            const insertResult = await db.collection('users').insertOne({
                email,
                info: { ...defaultUserInfo },
            });

            const { insertedId } = insertResult;
                
            jwt.sign({
                id: insertedId,
                email,
                info: { ...defaultUserInfo },
                isVerified: false,
            }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1d' }, 
            (err, token) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send({ error: err });
                }
                res.status(200).json({ token });
            });
        });
    },
}