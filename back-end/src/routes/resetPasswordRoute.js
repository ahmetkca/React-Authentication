import { ObjectId } from 'mongodb';
import { getDbConnection } from '../db';
import bcrypt from 'bcrypt';

export const resetPasswordRoute = {
    path: '/api/reset-password',
    method: 'PUT',
    handler: async (req, res) => {
        const { passwordResetToken, password } = req.body;
        console.log(`reset-password endpoint called with passwordResetToken: ${passwordResetToken}`);
        console.log(`reset-password endpoint called with password: ${password}`);
        const db = getDbConnection('react-auth-db');
        const user = await db.collection('users').findOne({ passwordResetToken });
        if (!user) {
            return res.status(404).json({ error: 'No user found with the provided password reset token.' });
        }
        const { _id: userId, email } = user;
        const newSalt = await bcrypt.genSalt(10);
        const pepper = process.env.PEPPER_STRING;
        const hashedPassword = await bcrypt.hash(newSalt + password + pepper, 10);
        const userUpdateResult = await db.collection('users')
                        .updateOne(
                            { _id: ObjectId(userId) }, 
                            { 
                                $set: { hashedPassword, salt: newSalt },
                                $unset: { passwordResetToken: '' }  // remove the passwordResetToken field from the user document
                            }
                        );
        if (userUpdateResult.modifiedCount === 0) {
            return res.status(404).json({ error: 'Password reset was not successful' });
        }
        return res.status(200).json({ message: 'Password reset successful' });
    }
}