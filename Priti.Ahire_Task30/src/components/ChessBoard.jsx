import { useState } from "react";

import ChessSquare from "./ChessSquare";

import {
  files,
  pieceSymbols,
  squareToPosition,
} from "../chess/chessEngine";

function ChessBoard({
  board,
  currentTurn,
  makeMove,
  gameOver,
}) {
  const [
    selectedSquare,
    setSelectedSquare,
  ] = useState(null);

  // ----------------------------------------------------------
  // Handle square click
  // ----------------------------------------------------------

  const handleSquareClick = (
    square
  ) => {
    if (gameOver) {
      return;
    }

    const {
      row,
      col,
    } = squareToPosition(square);

    const piece =
      board[row][col];

    // Nothing selected
    if (!selectedSquare) {
      if (!piece) {
        return;
      }

      // Only select current player's piece
      if (
        piece.color !== currentTurn
      ) {
        return;
      }

      setSelectedSquare(square);

      return;
    }

    // Click same square
    if (
      selectedSquare === square
    ) {
      setSelectedSquare(null);

      return;
    }

    // Try move
    const successfulMove =
      makeMove(
        selectedSquare,
        square
      );

    if (successfulMove) {
      setSelectedSquare(null);

      return;
    }

    // If another own piece was clicked,
    // select that piece instead
    if (
      piece &&
      piece.color === currentTurn
    ) {
      setSelectedSquare(square);
    }
  };

  const squares = [];

  // ----------------------------------------------------------
  // Create 64 squares
  // ----------------------------------------------------------

  for (
    let row = 0;
    row < 8;
    row++
  ) {
    for (
      let col = 0;
      col < 8;
      col++
    ) {
      const square =
        `${files[col]}${8 - row}`;

      const piece =
        board[row][col];

      const pieceSymbol =
        piece
          ? pieceSymbols[
              piece.color
            ][piece.type]
          : null;

      squares.push(
        <ChessSquare
          key={square}
          square={square}
          piece={pieceSymbol}
          isSelected={
            selectedSquare === square
          }
          onClick={() =>
            handleSquareClick(square)
          }
        />
      );
    }
  }

  return (
    <div className="chess-board">
      {squares}
    </div>
  );
}

export default ChessBoard;