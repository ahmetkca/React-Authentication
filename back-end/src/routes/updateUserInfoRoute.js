import { json } from 'express';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import { getDbConnection } from '../db';

export const updateUserInfoRoute = {
    path: '/api/users/:userId',
    method: 'PUT',
    handler: async (req, res) => {
        const { authorization } = req.headers;
        const { userId } = req.params;
        
        const updates = {};
        const allowedUpdates = ['hairColor', 'favoriteFood', 'bio'];
        for (const [key, value] of Object.entries(req.body)) {
            if (allowedUpdates.includes(key)) {
                updates[key] = value;
            }
        }

        if (!authorization) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const jwtToken = authorization.split(' ')[1];
        jwt.verify(jwtToken, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ error: 'Unauthorized' });
            }
            console.log(`decoded: ${JSON.stringify(decoded)}`);
            const { userId: decodedUserId } = decoded;
            console.log(`decodedUserId: ${decodedUserId}`);
            console.log(`userId: ${userId}`);
            if (decodedUserId !== userId) {
                return res.status(403).json({ error: 'Error: Unauthorized, cannot update other users info' });
            }
        });
        
        const db = getDbConnection('react-auth-db');

        // Temporary solution to only updating specific fields
        const user = await db.collection('users').findOne({ _id: ObjectId(userId) });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        ////////////////////////////////

        const userUpdateResult = await db.collection('users').updateOne({ _id: ObjectId(userId) }, { $set: { info: { ...user.info, ...updates } } });
        if (userUpdateResult.modifiedCount === 0) {
            return res.status(404).json({ error: 'User not found' });
        }


        const { email, info, isVerified } = await db.collection('users').findOne({ _id: ObjectId(userId) });
        const resToken = jwt.sign({
            userId,
            email,
            info: { ...info },
            isVerified,
        }, process.env.JWT_SECRET, { expiresIn: '1d' }, (err, token) => {
            if (err) {
                return res.status(500).send({ error: err });
            }
            return res.status(200).json({ token });
        });
    }
}
