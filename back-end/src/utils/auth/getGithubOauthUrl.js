require('dotenv').config({ path: `.env.${process.env.NODE_ENV}.local` });
import { v4 as uuidv4 } from 'uuid';

export const requestUsersGithubIdentity = () => {
    const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
    const redirect_uri = 'http://localhost:8080/auth/github/callback';
    const scopes = ['user', 'repo'];
    const scope = scopes.join(',');
    const state = uuidv4();

    const url = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${redirect_uri}&scope=${scope}&state=${state}`;


    return url;
}