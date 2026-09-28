function ChessSquare({
    square,
    piece,
    isSelected,
    onClick,
}) {
    // Calculate whether the square is dark
    const isDark =
        (square.charCodeAt(0) - 97 +
            parseInt(square[1])) %
        2 ===
        1;

    return (
        <div
            className={`square ${isDark
                    ? "dark-square"
                    : "light-square"
                } ${isSelected
                    ? "selected-square"
                    : ""
                }`}
            onClick={onClick}
        >
            {piece && (
                <span className="piece">
                    {piece}
                </span>
            )}
        </div>
    );
}

export default ChessSquare;