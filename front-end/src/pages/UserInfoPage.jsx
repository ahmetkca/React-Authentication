import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { useUser } from "../auth/useUser";
import { useJwtToken } from "../auth/useJwtToken";

export const UserInfoPage = () => {
    const { email, info, userId } = useUser();
    const [jwtToken, setJwtToken] = useJwtToken();

    const navigate = useNavigate();

    const [favoriteFood, setFavoriteFood] = useState(info?.favoriteFood || '');
    const [hairColor, setHairColor] = useState(info?.hairColor || '');
    const [bio, setBio] = useState(info?.bio || '');

    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);

    useEffect(() => {
        if (showSuccessMessage || showErrorMessage) {
            setTimeout(() => {
                setShowSuccessMessage(false);
                setShowErrorMessage(false);
            }, 3000);
        }
    } , [showSuccessMessage, showErrorMessage]);

    const onSaveChanges = async () => {
        try {
            const response = await axios.put(`http://localhost:8080/api/users/${userId}`, {
                favoriteFood,
                hairColor,
                bio
            }, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                }
            });

            const { token: newToken } = response.data;

            setJwtToken(newToken);
            setShowSuccessMessage(true);
        } catch (error) {
            setShowErrorMessage(true);
            console.log(error);
        }
    }

    const onLogOut = async () => {
        alert('Log out functionality not implemented yet');
    }

    const onResetValues = async () => {
        setFavoriteFood(info?.favoriteFood || '');
        setHairColor(info?.hairColor || '');
        setBio(info?.bio || '');
    }

    return (
        <div className="content-container">
            <h1>Info for {email}</h1>
            {showSuccessMessage && <div className="success">Successfully saved user data!</div>}
            {showErrorMessage && <div className="fail">Uh oh... something went wrong and we couldn't save changes.</div>}
            <label>
                Favorite food:
                <input 
                    type="text"
                    value={favoriteFood}
                    onChange={(e) => setFavoriteFood(e.target.value)} />
            </label>
            <label>
                Hair color:
                <input
                    type="text"
                    value={hairColor}
                    onChange={(e) => setHairColor(e.target.value)} />
            </label>
            <label>
                Bio:
                <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    rows="4"
                    cols="12" />
            </label>
            <button className="btn btn-primary" onClick={onSaveChanges}>Save Changes</button>
            <button className="btn btn-primary" onClick={onResetValues}>Reset Values</button>
            <button className="btn btn-primary" onClick={onLogOut}>Log Out</button>
        </div>
    )
}

export default UserInfoPage;