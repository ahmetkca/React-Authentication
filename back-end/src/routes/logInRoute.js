import jwt from 'jsonwebtoken';
import { getDbConnection } from '../db';

import { compareAsync } from '../utils/auth/bcryptCompareAsync';

export const logInRoute = {
    path: '/api/login',
    method: 'POST',
    handler: async (req, res) => {
        const { email, password } = req.body;

        const db = getDbConnection('react-auth-db');
        const user = await db.collection('users').findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'User not found' });
        }

        const { _id: id, hashedPassword, isVerified, info } = user;

        const isPasswordValid = await compareAsync(password, hashedPassword);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Password is incorrect' });
        }

        const token = jwt.sign({
            id,
            email,
            info,
            isVerified,
        }, process.env.JWT_SECRET, { expiresIn: '1d' }, (err, token) => {
            if (err) {
                return res.status(500).send({ error: err });
            }
            return res.status(200).json({ token });
        } );
    }
}
