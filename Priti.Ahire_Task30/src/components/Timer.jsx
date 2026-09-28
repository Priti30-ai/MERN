import { useEffect } from "react";

function Timer({
    player,
    time,
    setTime,
    isActive,
    isPaused,
    onTimeout,
}) {
    useEffect(() => {
        // Do nothing when timer is not active
        // or game is paused
        if (!isActive || isPaused) {
            return;
        }

        // Time has finished
        if (time <= 0) {
            onTimeout(player);
            return;
        }

        // Decrease timer every second
        const interval = setInterval(() => {
            setTime((previousTime) => {
                if (previousTime <= 1) {
                    return 0;
                }

                return previousTime - 1;
            });
        }, 1000);

        // Clear interval when component updates/unmounts
        return () => clearInterval(interval);
    }, [
        isActive,
        isPaused,
        time,
        setTime,
        player,
        onTimeout,
    ]);

    // Convert seconds into minutes
    const minutes = Math.floor(time / 60);

    // Get remaining seconds
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