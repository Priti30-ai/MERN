import {
  useEffect,
} from "react";

function Timer({
  player,
  time,
  setTime,
  isActive,
  isPaused,
  onTimeout,
}) {
  useEffect(() => {
    if (
      !isActive ||
      isPaused
    ) {
      return undefined;
    }

    if (time <= 0) {
      onTimeout(player);

      return undefined;
    }

    const interval =
      setInterval(() => {
        setTime(
          (previousTime) => {
            if (
              previousTime <= 1
            ) {
              return 0;
            }

            return (
              previousTime - 1
            );
          }
        );
      }, 1000);

    return () =>
      clearInterval(interval);
  }, [
    isActive,
    isPaused,
    time,
    setTime,
    player,
    onTimeout,
  ]);

  const minutes =
    Math.floor(time / 60);

  const seconds =
    time % 60;

  return (
    <div
      className={`timer ${
        isActive && !isPaused
          ? "active-timer"
          : ""
      }`}
    >
      <strong>
        {player}
      </strong>

      <span>
        {String(minutes).padStart(
          2,
          "0"
        )}
        :
        {String(seconds).padStart(
          2,
          "0"
        )}
      </span>
    </div>
  );
}

export default Timer;