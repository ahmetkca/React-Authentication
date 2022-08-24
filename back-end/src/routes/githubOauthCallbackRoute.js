require('dotenv').config({ path: `.env.${process.env.NODE_ENV}.local` });
import { getGithubUserInfo } from "../utils/auth/getGithubResources"
import jwt from 'jsonwebtoken';
import { updateOrCreateUserFromOauth } from "../utils/auth/updateOrCreateUserFromOauth";

export const githubOauthCallbackRoute = {
    path: '/auth/github/callback',
    method: 'GET',
    handler: async (req, res) => {
        const { code, state } = req.query;
        console.log(`code: ${code}, state: ${state}`);

        const userInfo = await getGithubUserInfo({ code });
        console.log(`userInfo:`);
        console.log(userInfo);

        if (!userInfo) {
            return res.status(500).json({ error: "Error: coudln't get authenticated github user info." });
        }

        const updateOrCreateUser = await updateOrCreateUserFromOauth({ oauthUserInfo: userInfo });
        console.log(`updateOrCreateUser:`);
        console.log(updateOrCreateUser);
        // console.log(`updateOrCreateUser: ${JSON.stringify(updateOrCreateUser)}`);

        const { _id: id, email, info, isVerified, githubAvatarUrl, githubUsername, githubBio, githubId } = updateOrCreateUser;
        jwt.sign(
            {
                userId: id,
                email,
                info: { ...info },
                isVerified,
                githubAvatarUrl,
                githubUsername,
                githubBio,
                githubId,
            }, process.env.JWT_SECRET, { expiresIn: '1d' }, (err, token) => {
                if (err) {
                    return res.status(500).send({ error: err });
                }
                console.log(`token: ${token}`);
                res.redirect(`http://localhost:5173/login?token=${token}`);
            }
        );
    }
}