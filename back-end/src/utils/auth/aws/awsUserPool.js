require('dotenv').config({ path: `.env.${process.env.NODE_ENV}.local` });
import { CognitoUserPool } from "amazon-cognito-identity-js";
import AWS, { CognitoIdentityCredentials } from "aws-sdk";
// import nodeFetch from "node-fetch";
// global.fetch = nodeFetch; // aws-sdk primarly meant to be used in frontend, browsers uses fetch by default

AWS.config.region = process.env.AWS_REGION;
AWS.config.credentials = new CognitoIdentityCredentials({
    IdentityPoolId: process.env.AWS_IDENTITY_POOL_ID,
});

const userPool = {
    UserPoolId: process.env.AWS_USER_POOL_ID,
    ClientId: process.env.AWS_CLIENT_ID,
};

export const awsUserPool = new CognitoUserPool(userPool);

