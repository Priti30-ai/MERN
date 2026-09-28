import { useState } from "react";
import ChessSquare from "./ChessSquare";

// Chess piece symbols
const pieceSymbols = {
    w: {
        p: "♙",
        r: "♖",
        n: "♘",
        b: "♗",
        q: "♕",
        k: "♔",
    },

    b: {
        p: "♟",
        r: "♜",
        n: "♞",
        b: "♝",
        q: "♛",
        k: "♚",
    },
};

// Chess board files
const files = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
];

function ChessBoard({ game, makeMove }) {
    // Selected square
    const [selectedSquare, setSelectedSquare] =
        useState(null);

    // Handle clicking a square
    const handleSquareClick = (square) => {
        const piece = game.get(square);

        // Nothing is selected yet
        if (!selectedSquare) {
            // Cannot select an empty square
            if (!piece) {
                return;
            }

            // Cannot select opponent's piece
            if (piece.color !== game.turn()) {
                return;
            }

            setSelectedSquare(square);

            return;
        }

        // Click same square again
        if (selectedSquare === square) {
            setSelectedSquare(null);
            return;
        }

        // Try to move the selected piece
        const successfulMove = makeMove(
            selectedSquare,
            square
        );

        if (successfulMove) {
            // Move successful
            setSelectedSquare(null);
        } else {
            // If another own piece was clicked,
            // select that piece instead
            if (
                piece &&
                piece.color === game.turn()
            ) {
                setSelectedSquare(square);
            } else {
                setSelectedSquare(null);
            }
        }
    };

    const board = game.board();

    const squares = [];

    // Create 64 squares
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const square = `${files[col]}${8 - row}`;

            const piece = board[row][col];

            const pieceSymbol = piece
                ? pieceSymbols[piece.color][piece.type]
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