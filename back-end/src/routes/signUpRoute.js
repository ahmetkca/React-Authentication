import { getDbConnection } from "../db";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { sendEmail } from "../utils/mail/sendEmail";

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
        const verificationToken = uuidv4();

        
        const defaultUser = {
            hairColor: '',
            favoriteFood: '',
            bio: '',
        };

        const newUser = await db.collection('users').insertOne({
            email,
            hashedPassword,
            info: { ...defaultUser },
            isVerified: false,
            verificationToken,
        });
        const { insertedId } = newUser;

        try {
            await sendEmail({
                to: email,
                from: 'akarapinrar@gmail.com',
                subject: 'Please verify your email',
                text: `
                    Please verify your email by clicking the following link:
                    http://localhost:3000/api/verify-email/${verificationToken}
                `,
                html: `
                    <p>Please verify your email by clicking the following link:</p>
                    <a href="http://localhost:5173/verify-email/${verificationToken}">
                        http://localhost:5173/verify-email/${verificationToken}
                    </a>
                `,
            });
        } catch (err) {
            console.log(err);
            return res.status(500).send({ error: 'Error sending email' });
        }
        
        const token = jwt.sign({
            userId: insertedId,
            email,
            info: { ...defaultUser },
            isVerified: false,
        }, process.env.JWT_SECRET, { expiresIn: '1d' }, (err, token) => {
            if (err) {
                return res.status(500).send({ error: err });
            }
            return res.status(200).json({ token });
        } );
    },
}