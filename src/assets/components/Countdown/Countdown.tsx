import "./Countdown.css"
import {useEffect, useState} from "react";

interface CountdownProps {
    time: number
}


export const Countdown = ({time}: CountdownProps) => {
    const [counter, setCounter] = useState(time);

    const minutes = Math.floor(counter / 60)
    const seconds = counter % 60 < 10 ? "0" + counter % 60 : counter % 60

    useEffect(() => {
        const timer = setInterval(() => setCounter((count) => count - 1), 1000);
        return () => clearInterval(timer);
    }, []);

    return <div className={"countdown"}>Запросить код повторно через {minutes}:{seconds}</div>
}