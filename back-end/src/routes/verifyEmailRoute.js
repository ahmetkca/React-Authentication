import { ObjectId } from 'mongodb';
import { getDbConnection } from '../db';
import jwt from 'jsonwebtoken';

let g_count = 10;

export const verifyEmailRoute = {
    path: '/api/verify-email',
    method: 'PUT',
    handler: async (req, res) => {
        const { verificationToken } = req.body;

        console.log(`verify-email endpoint called with verificationToken: ${verificationToken}`);
        const db = getDbConnection('react-auth-db');
        const user = await db.collection('users').findOne({ verificationToken });

        if (!user) {
            return res.status(404).json({ error: 'No email found with the provided verification token.' });
        }
        const { _id: userId, email, info } = user;

        if (user.isVerified) {  
            return res.status(400).json({ error: 'The email has already been verified' });
        }
        console.log(`${g_count++}  ::  userId: ${userId}, email: ${email}, info: ${JSON.stringify(info)}, isVerified: ${user.isVerified}`);

        const userUpdateResult = await db.collection('users').updateOne({ _id: ObjectId(userId) }, { $set: { isVerified: true } });

        if (userUpdateResult.modifiedCount === 0) {
            return res.status(404).json({ error: 'Verification was incorrect or Email is already verified' });
        }
        const { email: userEmail, info: userInfo, isVerified } = await db.collection('users').findOne({ _id: ObjectId(userId) });
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
    }
}
