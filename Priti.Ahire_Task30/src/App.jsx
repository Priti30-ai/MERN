import { useState } from "react";
import { Chess } from "chess.js";

import ChessBoard from "./components/ChessBoard";
import Timer from "./components/Timer";
import MoveHistory from "./components/MoveHistory";

import "./index.css";

function App() {
  // Chess game
  const [game, setGame] = useState(new Chess());

  // Current turn: "w" = White, "b" = Black
  const [currentTurn, setCurrentTurn] = useState("w");

  // Move history
  const [moves, setMoves] = useState([]);

  // Game status message
  const [gameStatus, setGameStatus] = useState("White's turn");

  // 10 minutes for each player
  const [whiteTime, setWhiteTime] = useState(600);
  const [blackTime, setBlackTime] = useState(600);

  // Pause / Resume
  const [isPaused, setIsPaused] = useState(false);

  // Check whether game has finished
  const [gameOver, setGameOver] = useState(false);

  // Update game status
  const updateGameStatus = (chessGame) => {
    // Checkmate
    if (chessGame.isCheckmate()) {
      setGameOver(true);

      if (chessGame.turn() === "w") {
        setGameStatus("Checkmate! Black wins");
      } else {
        setGameStatus("Checkmate! White wins");
      }

      return;
    }

    // Draw
    if (chessGame.isDraw()) {
      setGameOver(true);
      setGameStatus("Game Draw");
      return;
    }

    // Check
    if (chessGame.isCheck()) {
      if (chessGame.turn() === "w") {
        setGameStatus("White is in check");
      } else {
        setGameStatus("Black is in check");
      }

      return;
    }

    // Normal turn
    if (chessGame.turn() === "w") {
      setGameStatus("White's turn");
    } else {
      setGameStatus("Black's turn");
    }
  };

  // Make a chess move
  const makeMove = (from, to) => {
    // Don't allow moves when paused or game is over
    if (isPaused || gameOver) {
      return false;
    }

    try {
      const move = game.move({
        from: from,
        to: to,
        promotion: "q",
      });

      // Invalid move
      if (!move) {
        return false;
      }

      // Update move history
      setMoves(game.history());

      // Change turn
      setCurrentTurn(game.turn());

      // Update game status
      updateGameStatus(game);

      // Update board
      setGame(new Chess(game.fen()));

      return true;
    } catch (error) {
      return false;
    }
  };

  // When player's timer reaches zero
  const handleTimeout = (player) => {
    setGameOver(true);

    if (player === "White") {
      setGameStatus("Time up! Black wins");
    } else {
      setGameStatus("Time up! White wins");
    }
  };

  // Start a new game
  const resetGame = () => {
    setGame(new Chess());

    setCurrentTurn("w");

    setMoves([]);

    setGameStatus("White's turn");

    setWhiteTime(600);

    setBlackTime(600);

    setIsPaused(false);

    setGameOver(false);
  };

  return (
    <div className="app">

      <h1>♟ Offline Chess Game</h1>

      <p className="status">
        {gameStatus}
      </p>

      <div className="game-container">

        <div className="game-area">

          {/* Black Timer */}
          <Timer
            player="Black"
            time={blackTime}
            setTime={setBlackTime}
            isActive={currentTurn === "b"}
            isPaused={isPaused || gameOver}
            onTimeout={handleTimeout}
          />

          {/* Chess Board */}
          <ChessBoard
            game={game}
            makeMove={makeMove}
          />

          {/* White Timer */}
          <Timer
            player="White"
            time={whiteTime}
            setTime={setWhiteTime}
            isActive={currentTurn === "w"}
            isPaused={isPaused || gameOver}
            onTimeout={handleTimeout}
          />

        </div>

        {/* Move History */}
        <MoveHistory moves={moves} />

      </div>

      {/* Buttons */}
      <div className="controls">

        <button
          onClick={() => setIsPaused(!isPaused)}
          disabled={gameOver}
        >
          {isPaused ? "Resume Game" : "Pause Game"}
        </button>

        <button onClick={resetGame}>
          New Game
        </button>

      </div>

    </div>
  );
}

export default App;