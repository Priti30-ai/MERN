import { useEffect } from "react";

function Timer({
    player,
    time,
    setTime,
    isActive,
    isPaused,
}) {

    useEffect(() => {

        if (!isActive || isPaused || time <= 0) {
            return;
        }

        const interval = setInterval(() => {
            setTime((previousTime) =>
                previousTime - 1
            );
        }, 1000);

        return () => clearInterval(interval);

    }, [
        isActive,
        isPaused,
        time,
        setTime,
    ]);

    const minutes = Math.floor(time / 60);

    const seconds = time % 60;

    return (
        <div className="timer">
            <strong>{player}</strong>

            <span>
                {String(minutes).padStart(2, "0")}:
                {String(seconds).padStart(2, "0")}
            </span>
        </div>
    );
}

export default Timer;