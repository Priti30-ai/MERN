import { useState } from "react";
import ChessSquare from "./ChessSquare";

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

const files = ["a", "b", "c", "d", "e", "f", "g", "h"];

function ChessBoard({ game, makeMove }) {

    const [selectedSquare, setSelectedSquare] =
        useState(null);

    const board = game.board();

    const handleSquareClick = (square) => {

        const piece = game.get(square);

        if (!selectedSquare) {

            if (!piece) {
                return;
            }

            if (piece.color !== game.turn()) {
                return;
            }

            setSelectedSquare(square);
            return;
        }

        if (selectedSquare === square) {
            setSelectedSquare(null);
            return;
        }

        const successfulMove = makeMove(
            selectedSquare,
            square
        );

        if (successfulMove) {
            setSelectedSquare(null);
        } else {

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

    const squares = [];

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
                    isSelected={selectedSquare === square}
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