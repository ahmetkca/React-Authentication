import { useState, useEffect } from "react";
import { useJwtToken } from "./useJwtToken";

export const useUser = () => {
    const [token] = useJwtToken();

    const getPayloadFromJwtToken = (token) => {
        console.log(token);
        const payload = token.split(".")[1];
        return JSON.parse(atob(payload));
    }

    const [user, setUser] = useState(() => {
        if (token) {
            return getPayloadFromJwtToken(token);
        }
        return null;
    });

    useEffect(() => {
        if (token) {
            setUser(getPayloadFromJwtToken(token));
        } else {
            setUser(null);
        }
    }, [token]); // only re-run the effect if token changes

    return [user];
}
