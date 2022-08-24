import { getDbConnection } from "../../db";

export const updateOrCreateUserFromOauth = async ({ oauthUserInfo }) => {
    const {
        id: githubId,
        login: githubUsername,
        email: githubEmail,
        avatar_url: githubAvatarUrl,
        bio: githubBio,
    } = oauthUserInfo;
    const db = getDbConnection("react-auth-db");
    const existinguser = await db.collection("users").findOne({ email: githubEmail });

    console.log(existinguser);


    if (existinguser) {
        const updateResult = await db.collection("users").updateOne(
            { email: githubEmail }, 
            {
                $set: { githubUsername, githubAvatarUrl, githubId, githubBio },
            }
        );

        const user = await db.collection("users").findOne({ email: githubEmail });
        return user;
    }
    const defaultUser = {
        hairColor: '',
        favoriteFood: '',
        bio: '',
    };
    const insertResult = await db.collection("users").insertOne({
        email: githubEmail,
        githubUsername,
        githubAvatarUrl,
        githubId,
        githubBio,
        isVerified: true,
        info: { ...defaultUser },
    });
    if (insertResult.insertedCount === 0) {
        throw new Error("User insert failed");
    }
    const user = await db.collection("users").findOne({ email: githubEmail });
    return user;
}   
