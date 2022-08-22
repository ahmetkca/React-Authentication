import { useEffect, useState } from "react";

export const useTimer = (duration = 0) => {
    const [timeLeft, setTimeLeft] = useState(duration);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(timeLeft - 1);
        } , 1000);

        return () => {
            clearInterval(interval);
        }
    } , [timeLeft]);

    return timeLeft;
}
