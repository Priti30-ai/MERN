function ChessSquare({
  square,
  piece,
  isSelected,
  onClick,
}) {
  const fileIndex =
    square.charCodeAt(0) - 97;

  const rank =
    Number(square[1]);

  const isDark =
    (fileIndex + rank) % 2 === 1;

  return (
    <div
      className={`
        square
        ${
          isDark
            ? "dark-square"
            : "light-square"
        }
        ${
          isSelected
            ? "selected-square"
            : ""
        }
      `}
      onClick={onClick}
      title={square}
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