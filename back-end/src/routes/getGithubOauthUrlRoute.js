import { requestUsersGithubIdentity } from "../utils/auth/getGithubOauthUrl"

export const getGithubOauthUrlRoute = {
    path: '/auth/github/url',
    method: 'GET',
    handler: (req, res) => {
        const url = requestUsersGithubIdentity();
        // TODO: add optional login parameter to requestUsersGithubIdentity()
        return res.status(200).json({ url });
    }
}
