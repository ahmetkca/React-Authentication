require('dotenv').config({ path: `.env.${process.env.NODE_ENV}.local` });
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

        const { _id: id, hashedPassword, isVerified, info, salt } = user;
        const pepper = process.env.PEPPER_STRING;


        const isPasswordValid = await compareAsync(salt + password + pepper, hashedPassword);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Password is incorrect' });
        }

        console.log(`jwt.sign: ${JSON.stringify({
            userId: id,
            email,
            info: {...info},
            isVerified,
        })}`)
        const token = jwt.sign({
            userId: id,
            email,
            info: {...info},
            isVerified,
        }, process.env.JWT_SECRET, { expiresIn: '1d' }, (err, token) => {
            if (err) {
                return res.status(500).send({ error: err });
            }
            console.log(`token: ${token}`);``
            return res.status(200).json({ token });
        } );
    }
}
