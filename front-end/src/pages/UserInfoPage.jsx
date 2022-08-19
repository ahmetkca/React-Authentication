import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const UserInfoPage = () => {

    const navigate = useNavigate();

    const [favoriteFood, setFavoriteFood] = useState("");
    const [hairColor, setHairColor] = useState("");
    const [bio, setBio] = useState("");

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
        alert('Save functionality not implemented yet');
    }

    const onLogOut = async () => {
        alert('Log out functionality not implemented yet');
    }

    const onResetValues = async () => {
        alert('Reset functionality not implemented yet');
    }

    return (
        <div className="content-container">
            <h1>Info for ______</h1>
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
        </div>
    )
}

export default UserInfoPage;