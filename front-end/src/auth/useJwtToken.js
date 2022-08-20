import { useState } from "react";

export const useJwtToken = () => {
    const [jwtToken, setToken] = useState(() => {
        return localStorage.getItem("jwtToken"); // get the token from localStorage
    });

    const setJwtToken = (jwtToken) => {
        localStorage.setItem("jwtToken", jwtToken); // set the token to localStorage
        setToken(jwtToken); // set the token to the state
    }

    const clearJwtToken = () => {
        localStorage.removeItem("jwtToken"); // remove the token from localStorage
        setToken(null); // set the token to the state
    }

    return [jwtToken, setJwtToken, clearJwtToken];
}
