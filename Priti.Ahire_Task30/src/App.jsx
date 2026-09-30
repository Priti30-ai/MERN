import { useCallback, useState } from "react";

import ChessBoard from "./components/ChessBoard";
import Timer from "./components/Timer";
import MoveHistory from "./components/MoveHistory";

import {
  createInitialBoard,
  validateMove,
  makeMoveOnBoard,
  getNextEnPassantTarget,
  createMoveNotation,
  getGameStatus,
  squareToPosition,
} from "./chess/chessEngine";

import "./index.css";

const INITIAL_TIME = 600;

function App() {
  // ----------------------------------------------------------
  // Game State
  // ----------------------------------------------------------

  const [board, setBoard] = useState(createInitialBoard);

  // "w" = White, "b" = Black
  const [currentTurn, setCurrentTurn] = useState("w");

  const [moves, setMoves] = useState([]);

  const [gameStatus, setGameStatus] = useState("White's turn");

  const [notification, setNotification] = useState("");

  // Used for en passant validation
  const [enPassantTarget, setEnPassantTarget] = useState(null);

  // 10 minutes for each player
  const [whiteTime, setWhiteTime] = useState(INITIAL_TIME);
  const [blackTime, setBlackTime] = useState(INITIAL_TIME);

  const [isPaused, setIsPaused] = useState(false);

  const [gameOver, setGameOver] = useState(false);

  // ----------------------------------------------------------
  // Notification
  // ----------------------------------------------------------

  const showNotification = useCallback((message) => {
    setNotification(message);

    window.setTimeout(() => {
      setNotification("");
    }, 2500);
  }, []);

  // ----------------------------------------------------------
  // Make Chess Move
  // ----------------------------------------------------------

  const makeMove = useCallback(
    (from, to) => {
      // Prevent moves while paused
      if (isPaused) {
        showNotification(
          "Game is paused. Resume the game to move."
        );
        return false;
      }

      // Prevent moves after game ends
      if (gameOver) {
        showNotification(
          "Game is over. Start a new game."
        );
        return false;
      }

      // ------------------------------------------------------
      // Get source and destination positions
      // ------------------------------------------------------

      const fromPosition = squareToPosition(from);
      const toPosition = squareToPosition(to);

      const movingPiece =
        board[fromPosition.row][fromPosition.col];

      // ------------------------------------------------------
      // Validate Move
      // ------------------------------------------------------

      const validation = validateMove(
        board,
        from,
        to,
        currentTurn,
        enPassantTarget
      );

      // Illegal move
      if (!validation.valid) {
        showNotification(
          validation.reason || "Illegal move."
        );

        return false;
      }

      // ------------------------------------------------------
      // Capture Information
      // ------------------------------------------------------

      const capturedPiece =
        board[toPosition.row][toPosition.col];

      // ------------------------------------------------------
      // Promotion
      // ------------------------------------------------------

      const isPromotion =
        movingPiece?.type === "p" &&
        (toPosition.row === 0 ||
          toPosition.row === 7);

      // Promote pawn to Queen
      const promotionPiece = isPromotion ? "q" : null;

      // ------------------------------------------------------
      // Create Updated Board
      // ------------------------------------------------------

      const updatedBoard = makeMoveOnBoard(
        board,
        from,
        to,
        validation.specialMove,
        promotionPiece
      );

      // ------------------------------------------------------
      // Update En Passant Target
      // ------------------------------------------------------

      const nextEnPassantTarget =
        getNextEnPassantTarget(
          board,
          from,
          to,
          validation.specialMove
        );

      // ------------------------------------------------------
      // Create Move Notation
      // ------------------------------------------------------

      const notation = createMoveNotation(
        board,
        from,
        to,
        validation.specialMove,
        capturedPiece,
        promotionPiece
      );

      // ------------------------------------------------------
      // Update React State
      // ------------------------------------------------------

      setBoard(updatedBoard);

      setEnPassantTarget(
        nextEnPassantTarget
      );

      setMoves((previousMoves) => [
        ...previousMoves,
        notation,
      ]);

      // ------------------------------------------------------
      // Switch Player
      // ------------------------------------------------------

      const nextTurn =
        currentTurn === "w" ? "b" : "w";

      setCurrentTurn(nextTurn);

      // ------------------------------------------------------
      // Check Game Status
      // ------------------------------------------------------

      const nextStatus = getGameStatus(
        updatedBoard,
        nextTurn,
        nextEnPassantTarget
      );

      setGameStatus(nextStatus.message);

      // ------------------------------------------------------
      // Checkmate / Stalemate
      // ------------------------------------------------------

      if (
        nextStatus.status === "checkmate" ||
        nextStatus.status === "stalemate"
      ) {
        setGameOver(true);
      }

      return true;
    },
    [
      board,
      currentTurn,
      enPassantTarget,
      gameOver,
      isPaused,
      showNotification,
    ]
  );

  // ----------------------------------------------------------
  // Timer Timeout
  // ----------------------------------------------------------

  const handleTimeout = useCallback((player) => {
    setGameOver(true);

    if (player === "White") {
      setGameStatus("Time up! Black wins.");
    } else {
      setGameStatus("Time up! White wins.");
    }
  }, []);

  // ----------------------------------------------------------
  // Pause / Resume
  // ----------------------------------------------------------

  const togglePause = () => {
    if (gameOver) {
      return;
    }

    setIsPaused((previous) => !previous);
  };

  // ----------------------------------------------------------
  // Reset Game
  // ----------------------------------------------------------

  const resetGame = () => {
    setBoard(createInitialBoard());

    setCurrentTurn("w");

    setMoves([]);

    setGameStatus("White's turn");

    setNotification("");

    setEnPassantTarget(null);

    setWhiteTime(INITIAL_TIME);

    setBlackTime(INITIAL_TIME);

    setIsPaused(false);

    setGameOver(false);
  };

  // ----------------------------------------------------------
  // UI
  // ----------------------------------------------------------

  return (
    <main className="app">
      <h1>♟ Offline Chess Game</h1>

      {/* Game Status */}
      <p className="status">
        {gameStatus}
      </p>

      {/* Illegal Move / Game Notification */}
      {notification && (
        <div
          className="notification"
          role="alert"
        >
          ⚠ {notification}
        </div>
      )}

      <div className="game-container">

        {/* ==================================================
            Chess Game Area
        ================================================== */}

        <section className="game-area">

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
            board={board}
            currentTurn={currentTurn}
            makeMove={makeMove}
            gameOver={gameOver}
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

        </section>

        {/* ==================================================
            Move History
        ================================================== */}

        <aside className="move-history-area">
          <MoveHistory moves={moves} />
        </aside>

      </div>

      {/* ====================================================
          Game Controls
      ==================================================== */}

      <div className="controls">

        <button
          type="button"
          onClick={togglePause}
          disabled={gameOver}
        >
          {isPaused
            ? "Resume Game"
            : "Pause Game"}
        </button>

        <button
          type="button"
          onClick={resetGame}
        >
          New Game
        </button>

      </div>
    </main>
  );
}

export default App;