import { useState } from "react";
import { Chess } from "chess.js";
import ChessBoard from "./components/ChessBoard";
import Timer from "./components/Timer";
import MoveHistory from "./components/MoveHistory";
import "./index.css";

function App() {
  const [game, setGame] = useState(new Chess());

  const [currentTurn, setCurrentTurn] = useState("w");

  const [moves, setMoves] = useState([]);

  const [gameStatus, setGameStatus] = useState("White's turn");

  const [whiteTime, setWhiteTime] = useState(600);

  const [blackTime, setBlackTime] = useState(600);

  const [isPaused, setIsPaused] = useState(false);

  const makeMove = (from, to) => {
    try {
      const move = game.move({
        from,
        to,
        promotion: "q",
      });

      if (!move) {
        return false;
      }

      setMoves(game.history());

      setCurrentTurn(game.turn());

      if (game.isCheckmate()) {
        setGameStatus(
          game.turn() === "w"
            ? "Checkmate! Black wins"
            : "Checkmate! White wins"
        );
      } else if (game.isCheck()) {
        setGameStatus(
          game.turn() === "w"
            ? "White is in check"
            : "Black is in check"
        );
      } else {
        setGameStatus(
          game.turn() === "w"
            ? "White's turn"
            : "Black's turn"
        );
      }

      setGame(new Chess(game.fen()));

      return true;
    } catch (error) {
      return false;
    }
  };

  const resetGame = () => {
    setGame(new Chess());
    setCurrentTurn("w");
    setMoves([]);
    setGameStatus("White's turn");
    setWhiteTime(600);
    setBlackTime(600);
    setIsPaused(false);
  };

  return (
    <div className="app">
      <h1>♟ Offline Chess Game</h1>

      <p className="status">{gameStatus}</p>

      <div className="game-container">

        <div className="game-area">

          <Timer
            player="Black"
            time={blackTime}
            setTime={setBlackTime}
            isActive={currentTurn === "b"}
            isPaused={isPaused}
          />

          <ChessBoard
            game={game}
            makeMove={makeMove}
          />

          <Timer
            player="White"
            time={whiteTime}
            setTime={setWhiteTime}
            isActive={currentTurn === "w"}
            isPaused={isPaused}
          />

        </div>

        <MoveHistory moves={moves} />

      </div>

      <div className="controls">

        <button onClick={() => setIsPaused(!isPaused)}>
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