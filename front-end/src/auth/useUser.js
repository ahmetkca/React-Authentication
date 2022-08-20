import { useState, useEffect } from "react";
import { useJwtToken } from "./useJwtToken";

export const useUser = () => {
    const [jwtToken] = useJwtToken();

    const getPayloadFromJwtToken = (token) => {
        console.log(token);
        const payload = token.split(".")[1];
        return JSON.parse(atob(payload));
    }

    const [user, setUser] = useState(() => {
        if (jwtToken) {
            return getPayloadFromJwtToken(jwtToken);
        }
        return null;
    });

    useEffect(() => {
        if (jwtToken) {
            setUser(getPayloadFromJwtToken(jwtToken));
        } else {
            setUser(null);
        }
    }, [jwtToken]); // only re-run the effect if token changes

    return user;
}
