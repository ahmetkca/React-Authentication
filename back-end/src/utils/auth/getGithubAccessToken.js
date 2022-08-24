import axios from "axios";

export const getGithubAccessToken = async ({ code }) => {
    // TODO: check if the state is valid
    const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
    const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
    const redirect_uri = 'http://localhost:8080/auth/github/callback';
    const url = `https://github.com/login/oauth/access_token?client_id=${GITHUB_CLIENT_ID}&client_secret=${GITHUB_CLIENT_SECRET}&code=${code}&redirect_uri=${redirect_uri}`;
    const response = await axios.post(url, {}, { headers: { Accept: 'application/json' } });
    const { access_token } = response.data;
    return access_token;
}