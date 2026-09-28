# ♟️ Offline Chess Game – Task 30

A simple **offline Chess Game** built using **React.js** and **chess.js**.

The application allows two players to play chess on the same device without requiring an internet connection or backend server. It includes legal move validation, turn management, check/checkmate detection, move history, player timers, pause/resume functionality, and game reset.

---

## 📌 Project Overview

This project is a React-based chess game designed to demonstrate the use of:

- React components
- React Hooks
- State management
- Event handling
- Conditional rendering
- Component-based UI design
- Chess game logic using `chess.js`

The game runs completely on the client side.

---

## ✨ Features

### ♟️ Chess Board
- 8 × 8 standard chess board
- White and black chess pieces
- Click a piece and then select its destination square
- Turn-based gameplay

### ✅ Legal Move Validation
- Only legal chess moves are allowed
- Invalid moves are rejected
- Players can only move their own pieces
- Pawn promotion is handled automatically with Queen promotion

### 🔄 Turn Management
- White and Black take turns
- Current player's turn is displayed
- The timer automatically changes according to the current turn

### 👑 Check & Checkmate
- Detects when a player is in check
- Detects checkmate
- Displays the game result when checkmate occurs

### ⏱️ Player Timer
- Separate timer for White and Black
- Each player starts with **10 minutes**
- Only the current player's timer runs
- Timer pauses when the game is paused
- Game ends when a player's time reaches zero

### ⏸️ Pause / Resume
- Pause the game at any time
- Resume the game when ready
- Timers stop while the game is paused
- Moves cannot be made while paused

### 📜 Move History
- Displays all played moves
- Moves are arranged in numbered rows
- White and Black moves are displayed separately

### 🔄 New Game
- Resets the chess board
- Resets both timers
- Clears move history
- Resets the game status
- Starts a new game

### 📱 Responsive Design
- Desktop-friendly chess board
- Responsive layout for smaller screens
- Move history adjusts for mobile screens

---

## 🛠️ Technologies Used

| Technology | Purpose |
|------------|---------|
| React.js | Frontend UI |
| Vite | Development and build tool |
| JavaScript | Application logic |
| CSS | Styling and responsive design |
| chess.js | Chess rules and move validation |
| ESLint | Code quality and linting |

---

## 📂 Project Structure

```text
Priti.Ahire_Task30/
│
├── public/
│
├── src/
│   ├── components/
│   │   ├── ChessBoard.jsx
│   │   ├── ChessSquare.jsx
│   │   ├── MoveHistory.jsx
│   │   └── Timer.jsx
│   │
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
└── README.md