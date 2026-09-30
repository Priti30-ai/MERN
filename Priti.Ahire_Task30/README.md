# Offline Chess Game

A responsive offline chess game built using React and a custom JavaScript chess engine.

## Features

- Two-player local chess game
- Custom chess board
- Pawn movement
- Rook movement
- Knight movement
- Bishop movement
- Queen movement
- King movement
- Piece capture
- Path obstruction checking
- Turn management
- Check detection
- Checkmate detection
- Stalemate detection
- Castling
- En passant
- Pawn promotion
- Illegal move notifications
- Move history
- Separate timers for White and Black
- Pause and resume
- New game/reset functionality
- Responsive design

## Technology

- React.js
- JavaScript
- CSS
- Vite

## Custom Chess Engine

This project does not use any external chess library.

All chess rules and validation are implemented using native JavaScript.

The custom chess engine handles:

1. Board initialization
2. Piece movement validation
3. Path checking
4. Captures
5. Turn validation
6. King safety
7. Check detection
8. Checkmate detection
9. Stalemate detection
10. Castling
11. En passant
12. Pawn promotion
13. Illegal move notification

## Project Structure

```text
src/
├── App.jsx
├── index.css
├── main.jsx
│
├── chess/
│   └── chessEngine.js
│
└── components/
    ├── ChessBoard.jsx
    ├── ChessSquare.jsx
    ├── MoveHistory.jsx
    └── Timer.jsx