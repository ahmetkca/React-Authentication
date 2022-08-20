import { getDbConnection } from "../db";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

export const signUpRoute = {
    path: '/api/signup',
    method: 'POST',
    handler: async (req, res) => {
        const { email, password } = req.body;

        const db = getDbConnection('react-auth-db');
        const user = await db.collection('users').findOne({ email });
        if (user) {
            return res.status(409).send({ error: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        const defaultUser = {
            hairColor: '',
            favoriteFood: '',
            bio: '',
        };

        const newUser = await db.collection('users').insertOne({
            email,
            hashedPassword,
            info: defaultUser,
            isVerified: false,
        });
        const { insertedId } = newUser;
        
        const token = jwt.sign({
            userId: insertedId,
            email,
            info:   defaultUser,
            isVerified: false,
        }, process.env.JWT_SECRET, { expiresIn: '1d' }, (err, token) => {
            if (err) {
                return res.status(500).send({ error: err });
            }
            return res.status(200).json({ token });
        } );
    },
}