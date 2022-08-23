import { v4 as uuidv4 } from 'uuid';
import { sendEmail } from '../utils/mail/sendEmail';
import { getDbConnection } from '../db';

export const forgotPasswordRoute = {
    path: '/api/forgot-password',
    method: 'PUT',
    handler: async (req, res) => {
        const { email } = req.body;
        const db = getDbConnection('react-auth-db');
        const user = await db.collection('users').findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'No user found with the provided email.' });
        }

        const passwordResetToken = uuidv4();
        
        const userUpdateResult = await db.collection('users').updateOne({ email }, { $set: { passwordResetToken } });
        if (userUpdateResult.modifiedCount === 0) {
            return res.status(404).json({ error: 'Password reset token was not created' });
        }

        try {
            await sendEmail({
                to: user.email,
                from: 'akarapinrar@gmail.com',
                subject: 'Password Reset',
                text: `
                    You are receiving this because you (or someone else) have requested the reset of the password for your account.
                    Please click on the following link, or paste this into your browser to complete the process:
                    http://localhost:5173/reset-password/${passwordResetToken}
                    If you did not request this, please ignore this email and your password will remain unchanged.
                `,
                html: `
                    <p>You are receiving this because you (or someone else) have requested the reset of the password for your account.</p>
                    <p>Please click on the following link, or paste this into your browser to complete the process:</p>
                    <p><a href="http://localhost:5173/reset-password/${passwordResetToken}">http://localhost:5173/reset-password/${passwordResetToken}</a></p>
                    <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
                `,
            });
        } catch (error) {
            return res.status(500).json({ error: 'Error sending password reset email' });
        }

        return res.status(200).json({ message: 'Password reset email sent' });
    }
}
