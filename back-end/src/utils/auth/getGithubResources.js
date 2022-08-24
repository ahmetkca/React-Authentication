import axios from 'axios';
import { getGithubAccessToken } from './getGithubAccessToken';

const getAccessAndBearerTokenUrl = async ({ accessToken, endpoint, method }) => {
    endpoint = endpoint[0] === '/' ? endpoint.substring(1) : endpoint;
    method = method.toLowerCase();
    const callback = async () => {
        return await axios[method](`https://api.github.com/${endpoint}`, {
            headers: {
                Authorization: `token ${accessToken}`,
                Accept: 'application/vnd.github+json'
            }
        });
    }
    return await callback();
}

export const getGithubUserInfo = async ({ code }) => {
    const accessToken = await getGithubAccessToken({ code });
    const { data } = await getAccessAndBearerTokenUrl({ accessToken, endpoint: '/user', method: 'GET' });
    return  data;
}

export const getGithubUsersRepositories = async ({ code }) => {
    const accessToken = await getGithubAccessToken({ code });
    const { data } = await getAccessAndBearerTokenUrl({ accessToken, endpoint: '/repositories', method: 'GET' });
    return data;
}
