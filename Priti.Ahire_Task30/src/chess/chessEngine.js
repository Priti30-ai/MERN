// ============================================================
// CUSTOM CHESS ENGINE
// No external chess library is used.
// All movement, check and checkmate logic is implemented here.
// ============================================================

export const files = ["a", "b", "c", "d", "e", "f", "g", "h"];

export const pieceSymbols = {
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

// ------------------------------------------------------------
// Create one chess piece
// ------------------------------------------------------------

function createPiece(type, color) {
  return {
    type,
    color,
    hasMoved: false,
  };
}

// ------------------------------------------------------------
// Create initial chess board
// ------------------------------------------------------------

export function createInitialBoard() {
  const board = Array.from(
    { length: 8 },
    () => Array(8).fill(null)
  );

  // Black pieces
  board[0] = [
    createPiece("r", "b"),
    createPiece("n", "b"),
    createPiece("b", "b"),
    createPiece("q", "b"),
    createPiece("k", "b"),
    createPiece("b", "b"),
    createPiece("n", "b"),
    createPiece("r", "b"),
  ];

  // Black pawns
  for (let col = 0; col < 8; col++) {
    board[1][col] = createPiece("p", "b");
  }

  // White pawns
  for (let col = 0; col < 8; col++) {
    board[6][col] = createPiece("p", "w");
  }

  // White pieces
  board[7] = [
    createPiece("r", "w"),
    createPiece("n", "w"),
    createPiece("b", "w"),
    createPiece("q", "w"),
    createPiece("k", "w"),
    createPiece("b", "w"),
    createPiece("n", "w"),
    createPiece("r", "w"),
  ];

  return board;
}

// ------------------------------------------------------------
// Clone board
// ------------------------------------------------------------

export function cloneBoard(board) {
  return board.map((row) =>
    row.map((piece) =>
      piece ? { ...piece } : null
    )
  );
}

// ------------------------------------------------------------
// Convert chess square to board coordinates
// Example: e4 -> { row: 4, col: 4 }
// ------------------------------------------------------------

export function squareToPosition(square) {
  const col = files.indexOf(square[0]);
  const row = 8 - Number(square[1]);

  return { row, col };
}

// ------------------------------------------------------------
// Convert board coordinates to chess square
// Example: {row: 4, col: 4} -> e4
// ------------------------------------------------------------

export function positionToSquare(row, col) {
  return `${files[col]}${8 - row}`;
}

// ------------------------------------------------------------
// Check whether coordinates are inside board
// ------------------------------------------------------------

function isInsideBoard(row, col) {
  return (
    row >= 0 &&
    row < 8 &&
    col >= 0 &&
    col < 8
  );
}

// ------------------------------------------------------------
// Path checking
// Used by Rook, Bishop and Queen
// ------------------------------------------------------------

export function isPathClear(
  board,
  fromRow,
  fromCol,
  toRow,
  toCol
) {
  const rowStep = Math.sign(toRow - fromRow);
  const colStep = Math.sign(toCol - fromCol);

  let row = fromRow + rowStep;
  let col = fromCol + colStep;

  while (
    row !== toRow ||
    col !== toCol
  ) {
    if (board[row][col]) {
      return false;
    }

    row += rowStep;
    col += colStep;
  }

  return true;
}

// ------------------------------------------------------------
// Pawn movement
// ------------------------------------------------------------

function isValidPawnMove(
  board,
  fromRow,
  fromCol,
  toRow,
  toCol,
  piece,
  enPassantTarget
) {
  const direction =
    piece.color === "w" ? -1 : 1;

  const startingRow =
    piece.color === "w" ? 6 : 1;

  const rowDiff = toRow - fromRow;
  const colDiff = toCol - fromCol;

  const targetPiece = board[toRow][toCol];

  // One square forward
  if (
    colDiff === 0 &&
    rowDiff === direction &&
    !targetPiece
  ) {
    return {
      valid: true,
      specialMove: null,
    };
  }

  // Two squares forward from starting position
  if (
    colDiff === 0 &&
    rowDiff === 2 * direction &&
    fromRow === startingRow &&
    !targetPiece &&
    !board[fromRow + direction][fromCol]
  ) {
    return {
      valid: true,
      specialMove: "double-pawn",
    };
  }

  // Normal diagonal capture
  if (
    Math.abs(colDiff) === 1 &&
    rowDiff === direction &&
    targetPiece &&
    targetPiece.color !== piece.color
  ) {
    return {
      valid: true,
      specialMove: null,
    };
  }

  // En passant
  if (
    Math.abs(colDiff) === 1 &&
    rowDiff === direction &&
    !targetPiece &&
    enPassantTarget &&
    enPassantTarget.row === toRow &&
    enPassantTarget.col === toCol
  ) {
    return {
      valid: true,
      specialMove: "en-passant",
    };
  }

  return {
    valid: false,
    reason:
      "Pawn can move forward or capture diagonally.",
  };
}

// ------------------------------------------------------------
// Rook movement
// ------------------------------------------------------------

function isValidRookMove(
  board,
  fromRow,
  fromCol,
  toRow,
  toCol
) {
  const sameRow = fromRow === toRow;
  const sameColumn = fromCol === toCol;

  if (!sameRow && !sameColumn) {
    return {
      valid: false,
      reason:
        "Rook can only move horizontally or vertically.",
    };
  }

  if (
    !isPathClear(
      board,
      fromRow,
      fromCol,
      toRow,
      toCol
    )
  ) {
    return {
      valid: false,
      reason: "The path is blocked.",
    };
  }

  return {
    valid: true,
    specialMove: null,
  };
}

// ------------------------------------------------------------
// Knight movement
// ------------------------------------------------------------

function isValidKnightMove(
  fromRow,
  fromCol,
  toRow,
  toCol
) {
  const rowDiff = Math.abs(toRow - fromRow);
  const colDiff = Math.abs(toCol - fromCol);

  const valid =
    (rowDiff === 2 && colDiff === 1) ||
    (rowDiff === 1 && colDiff === 2);

  if (!valid) {
    return {
      valid: false,
      reason:
        "Knight must move in an L-shape.",
    };
  }

  return {
    valid: true,
    specialMove: null,
  };
}

// ------------------------------------------------------------
// Bishop movement
// ------------------------------------------------------------

function isValidBishopMove(
  board,
  fromRow,
  fromCol,
  toRow,
  toCol
) {
  const rowDiff = Math.abs(toRow - fromRow);
  const colDiff = Math.abs(toCol - fromCol);

  if (rowDiff !== colDiff) {
    return {
      valid: false,
      reason:
        "Bishop can only move diagonally.",
    };
  }

  if (
    !isPathClear(
      board,
      fromRow,
      fromCol,
      toRow,
      toCol
    )
  ) {
    return {
      valid: false,
      reason: "The diagonal path is blocked.",
    };
  }

  return {
    valid: true,
    specialMove: null,
  };
}

// ------------------------------------------------------------
// Queen movement
// ------------------------------------------------------------

function isValidQueenMove(
  board,
  fromRow,
  fromCol,
  toRow,
  toCol
) {
  const sameLine =
    fromRow === toRow ||
    fromCol === toCol;

  const diagonal =
    Math.abs(toRow - fromRow) ===
    Math.abs(toCol - fromCol);

  if (!sameLine && !diagonal) {
    return {
      valid: false,
      reason:
        "Queen can move horizontally, vertically or diagonally.",
    };
  }

  if (
    !isPathClear(
      board,
      fromRow,
      fromCol,
      toRow,
      toCol
    )
  ) {
    return {
      valid: false,
      reason: "The path is blocked.",
    };
  }

  return {
    valid: true,
    specialMove: null,
  };
}

// ------------------------------------------------------------
// King movement
// ------------------------------------------------------------

function isValidKingMove(
  fromRow,
  fromCol,
  toRow,
  toCol
) {
  const rowDiff = Math.abs(toRow - fromRow);
  const colDiff = Math.abs(toCol - fromCol);

  if (rowDiff <= 1 && colDiff <= 1) {
    return {
      valid: true,
      specialMove: null,
    };
  }

  return {
    valid: false,
    reason:
      "King can move only one square at a time.",
  };
}

// ------------------------------------------------------------
// Find king
// ------------------------------------------------------------

export function findKing(board, color) {
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col];

      if (
        piece &&
        piece.type === "k" &&
        piece.color === color
      ) {
        return { row, col };
      }
    }
  }

  return null;
}

// ------------------------------------------------------------
// Check if a piece attacks a square
//
// This function is used for CHECK detection.
// It does not care whether moving that piece would expose
// its own king.
// ------------------------------------------------------------

export function canPieceAttackSquare(
  board,
  fromRow,
  fromCol,
  toRow,
  toCol
) {
  const piece = board[fromRow][fromCol];

  if (!piece) {
    return false;
  }

  const rowDiff = toRow - fromRow;
  const colDiff = toCol - fromCol;

  const absRow = Math.abs(rowDiff);
  const absCol = Math.abs(colDiff);

  switch (piece.type) {
    case "p": {
      const direction =
        piece.color === "w" ? -1 : 1;

      return (
        rowDiff === direction &&
        absCol === 1
      );
    }

    case "r":
      if (
        fromRow !== toRow &&
        fromCol !== toCol
      ) {
        return false;
      }

      return isPathClear(
        board,
        fromRow,
        fromCol,
        toRow,
        toCol
      );

    case "n":
      return (
        (absRow === 2 && absCol === 1) ||
        (absRow === 1 && absCol === 2)
      );

    case "b":
      if (absRow !== absCol) {
        return false;
      }

      return isPathClear(
        board,
        fromRow,
        fromCol,
        toRow,
        toCol
      );

    case "q": {
      const straight =
        fromRow === toRow ||
        fromCol === toCol;

      const diagonal =
        absRow === absCol;

      if (!straight && !diagonal) {
        return false;
      }

      return isPathClear(
        board,
        fromRow,
        fromCol,
        toRow,
        toCol
      );
    }

    case "k":
      return (
        absRow <= 1 &&
        absCol <= 1
      );

    default:
      return false;
  }
}

// ------------------------------------------------------------
// CHECK detection
// ------------------------------------------------------------

export function isKingInCheck(
  board,
  color
) {
  const kingPosition =
    findKing(board, color);

  if (!kingPosition) {
    return true;
  }

  const opponent =
    color === "w" ? "b" : "w";

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col];

      if (
        piece &&
        piece.color === opponent
      ) {
        if (
          canPieceAttackSquare(
            board,
            row,
            col,
            kingPosition.row,
            kingPosition.col
          )
        ) {
          return true;
        }
      }
    }
  }

  return false;
}

// ------------------------------------------------------------
// Apply a move to a copied board
// ------------------------------------------------------------

function applyMoveToBoard(
  board,
  from,
  to,
  specialMove,
  promotion = "q"
) {
  const newBoard = cloneBoard(board);

  const movingPiece =
    newBoard[from.row][from.col];

  if (!movingPiece) {
    return newBoard;
  }

  // En passant capture
  if (specialMove === "en-passant") {
    const capturedPawnRow = from.row;
    const capturedPawnCol = to.col;

    newBoard[capturedPawnRow][capturedPawnCol] =
      null;
  }

  // Castling
  if (
    specialMove === "castle-kingside" ||
    specialMove === "castle-queenside"
  ) {
    const row = from.row;

    if (
      specialMove ===
      "castle-kingside"
    ) {
      const rook =
        newBoard[row][7];

      newBoard[row][5] = rook;
      newBoard[row][7] = null;

      if (rook) {
        rook.hasMoved = true;
      }
    } else {
      const rook =
        newBoard[row][0];

      newBoard[row][3] = rook;
      newBoard[row][0] = null;

      if (rook) {
        rook.hasMoved = true;
      }
    }
  }

  movingPiece.hasMoved = true;

  // Promotion
  if (
    movingPiece.type === "p" &&
    (to.row === 0 || to.row === 7)
  ) {
    movingPiece.type = promotion;
  }

  newBoard[to.row][to.col] =
    movingPiece;

  newBoard[from.row][from.col] =
    null;

  return newBoard;
}

// ------------------------------------------------------------
// Check whether castling is legal
// ------------------------------------------------------------

function getCastleMove(
  board,
  fromRow,
  fromCol,
  toRow,
  toCol,
  color
) {
  const homeRow =
    color === "w" ? 7 : 0;

  if (fromRow !== homeRow || fromCol !== 4) {
    return null;
  }

  if (toRow !== homeRow) {
    return null;
  }

  if (isKingInCheck(
    board,
    color
  )) {
    return null;
  }

  // Kingside
  if (toCol === 6) {
    const rook = board[homeRow][7];

    if (
      !rook ||
      rook.type !== "r" ||
      rook.color !== color ||
      rook.hasMoved
    ) {
      return null;
    }

    if (
      board[homeRow][5] ||
      board[homeRow][6]
    ) {
      return null;
    }

    const testBoard1 =
      applyMoveToBoard(
        board,
        { row: homeRow, col: 4 },
        { row: homeRow, col: 5 },
        null
      );

    if (
      isKingInCheck(
        testBoard1,
        color
      )
    ) {
      return null;
    }

    const testBoard2 =
      applyMoveToBoard(
        board,
        { row: homeRow, col: 4 },
        { row: homeRow, col: 6 },
        null
      );

    if (
      isKingInCheck(
        testBoard2,
        color
      )
    ) {
      return null;
    }

    return "castle-kingside";
  }

  // Queenside
  if (toCol === 2) {
    const rook = board[homeRow][0];

    if (
      !rook ||
      rook.type !== "r" ||
      rook.color !== color ||
      rook.hasMoved
    ) {
      return null;
    }

    if (
      board[homeRow][1] ||
      board[homeRow][2] ||
      board[homeRow][3]
    ) {
      return null;
    }

    const testBoard1 =
      applyMoveToBoard(
        board,
        { row: homeRow, col: 4 },
        { row: homeRow, col: 3 },
        null
      );

    if (
      isKingInCheck(
        testBoard1,
        color
      )
    ) {
      return null;
    }

    const testBoard2 =
      applyMoveToBoard(
        board,
        { row: homeRow, col: 4 },
        { row: homeRow, col: 2 },
        null
      );

    if (
      isKingInCheck(
        testBoard2,
        color
      )
    ) {
      return null;
    }

    return "castle-queenside";
  }

  return null;
}

// ------------------------------------------------------------
// Validate a piece's basic movement
// ------------------------------------------------------------

function validatePieceMovement(
  board,
  from,
  to,
  piece,
  enPassantTarget
) {
  switch (piece.type) {
    case "p":
      return isValidPawnMove(
        board,
        from.row,
        from.col,
        to.row,
        to.col,
        piece,
        enPassantTarget
      );

    case "r":
      return isValidRookMove(
        board,
        from.row,
        from.col,
        to.row,
        to.col
      );

    case "n":
      return isValidKnightMove(
        from.row,
        from.col,
        to.row,
        to.col
      );

    case "b":
      return isValidBishopMove(
        board,
        from.row,
        from.col,
        to.row,
        to.col
      );

    case "q":
      return isValidQueenMove(
        board,
        from.row,
        from.col,
        to.row,
        to.col
      );

    case "k":
      return isValidKingMove(
        from.row,
        from.col,
        to.row,
        to.col
      );

    default:
      return {
        valid: false,
        reason: "Unknown chess piece.",
      };
  }
}

// ------------------------------------------------------------
// Full legal move validation
// ------------------------------------------------------------

export function validateMove(
  board,
  fromSquare,
  toSquare,
  color,
  enPassantTarget = null
) {
  const from =
    typeof fromSquare === "string"
      ? squareToPosition(fromSquare)
      : fromSquare;

  const to =
    typeof toSquare === "string"
      ? squareToPosition(toSquare)
      : toSquare;

  if (
    !isInsideBoard(from.row, from.col) ||
    !isInsideBoard(to.row, to.col)
  ) {
    return {
      valid: false,
      reason: "Invalid board position.",
    };
  }

  if (
    from.row === to.row &&
    from.col === to.col
  ) {
    return {
      valid: false,
      reason: "Choose a different square.",
    };
  }

  const piece =
    board[from.row][from.col];

  if (!piece) {
    return {
      valid: false,
      reason: "There is no piece on that square.",
    };
  }

  if (piece.color !== color) {
    return {
      valid: false,
      reason: "You can only move your own piece.",
    };
  }

  const target =
    board[to.row][to.col];

  if (
    target &&
    target.color === piece.color
  ) {
    return {
      valid: false,
      reason: "You cannot capture your own piece.",
    };
  }

  // Castling
  if (
    piece.type === "k" &&
    Math.abs(to.col - from.col) === 2
  ) {
    const castleMove =
      getCastleMove(
        board,
        from.row,
        from.col,
        to.row,
        to.col,
        color
      );

    if (!castleMove) {
      return {
        valid: false,
        reason:
          "Castling is not legal in this position.",
      };
    }

    const testBoard =
      applyMoveToBoard(
        board,
        from,
        to,
        castleMove
      );

    if (
      isKingInCheck(
        testBoard,
        color
      )
    ) {
      return {
        valid: false,
        reason:
          "You cannot castle into check.",
      };
    }

    return {
      valid: true,
      specialMove: castleMove,
    };
  }

  const movement =
    validatePieceMovement(
      board,
      from,
      to,
      piece,
      enPassantTarget
    );

  if (!movement.valid) {
    return movement;
  }

  // Simulate move
  const simulatedBoard =
    applyMoveToBoard(
      board,
      from,
      to,
      movement.specialMove
    );

  // Own king must remain safe
  if (
    isKingInCheck(
      simulatedBoard,
      color
    )
  ) {
    return {
      valid: false,
      reason:
        "Illegal move: your king would be in check.",
    };
  }

  return {
    valid: true,
    specialMove:
      movement.specialMove || null,
  };
}

// ------------------------------------------------------------
// Generate all legal moves for a player
// Used for checkmate and stalemate detection
// ------------------------------------------------------------

export function getAllLegalMoves(
  board,
  color,
  enPassantTarget = null
) {
  const legalMoves = [];

  for (let fromRow = 0; fromRow < 8; fromRow++) {
    for (
      let fromCol = 0;
      fromCol < 8;
      fromCol++
    ) {
      const piece =
        board[fromRow][fromCol];

      if (
        !piece ||
        piece.color !== color
      ) {
        continue;
      }

      for (let toRow = 0; toRow < 8; toRow++) {
        for (
          let toCol = 0;
          toCol < 8;
          toCol++
        ) {
          const result =
            validateMove(
              board,
              { row: fromRow, col: fromCol },
              { row: toRow, col: toCol },
              color,
              enPassantTarget
            );

          if (result.valid) {
            legalMoves.push({
              from: {
                row: fromRow,
                col: fromCol,
              },

              to: {
                row: toRow,
                col: toCol,
              },

              specialMove:
                result.specialMove,
            });
          }
        }
      }
    }
  }

  return legalMoves;
}

// ------------------------------------------------------------
// CHECKMATE detection
// ------------------------------------------------------------

export function isCheckmate(
  board,
  color,
  enPassantTarget = null
) {
  if (
    !isKingInCheck(
      board,
      color
    )
  ) {
    return false;
  }

  const legalMoves =
    getAllLegalMoves(
      board,
      color,
      enPassantTarget
    );

  return legalMoves.length === 0;
}

// ------------------------------------------------------------
// STALEMATE detection
// ------------------------------------------------------------

export function isStalemate(
  board,
  color,
  enPassantTarget = null
) {
  if (
    isKingInCheck(
      board,
      color
    )
  ) {
    return false;
  }

  const legalMoves =
    getAllLegalMoves(
      board,
      color,
      enPassantTarget
    );

  return legalMoves.length === 0;
}

// ------------------------------------------------------------
// Apply actual legal move
// ------------------------------------------------------------

export function makeMoveOnBoard(
  board,
  fromSquare,
  toSquare,
  specialMove = null,
  promotion = "q"
) {
  const from =
    typeof fromSquare === "string"
      ? squareToPosition(fromSquare)
      : fromSquare;

  const to =
    typeof toSquare === "string"
      ? squareToPosition(toSquare)
      : toSquare;

  return applyMoveToBoard(
    board,
    from,
    to,
    specialMove,
    promotion
  );
}

// ------------------------------------------------------------
// Create next en-passant target
// ------------------------------------------------------------

export function getNextEnPassantTarget(
  board,
  fromSquare,
  toSquare,
  specialMove
) {
  if (specialMove !== "double-pawn") {
    return null;
  }

  const from =
    typeof fromSquare === "string"
      ? squareToPosition(fromSquare)
      : fromSquare;

  const to =
    typeof toSquare === "string"
      ? squareToPosition(toSquare)
      : toSquare;

  return {
    row: (from.row + to.row) / 2,
    col: from.col,
  };
}

// ------------------------------------------------------------
// Create readable move notation
// ------------------------------------------------------------

export function createMoveNotation(
  board,
  fromSquare,
  toSquare,
  specialMove,
  capturedPiece = null,
  promotion = null
) {
  const from =
    typeof fromSquare === "string"
      ? fromSquare
      : positionToSquare(
          fromSquare.row,
          fromSquare.col
        );

  const to =
    typeof toSquare === "string"
      ? toSquare
      : positionToSquare(
          toSquare.row,
          toSquare.col
        );

  if (
    specialMove === "castle-kingside"
  ) {
    return "O-O";
  }

  if (
    specialMove === "castle-queenside"
  ) {
    return "O-O-O";
  }

  const fromPosition =
    squareToPosition(from);

  const piece =
    board[fromPosition.row][fromPosition.col];

  if (!piece) {
    return `${from}-${to}`;
  }

  const pieceNames = {
    p: "",
    r: "R",
    n: "N",
    b: "B",
    q: "Q",
    k: "K",
  };

  const pieceLetter =
    pieceNames[piece.type];

  const capture =
    capturedPiece ? "x" : "-";

  let notation =
    `${pieceLetter}${from}${capture}${to}`;

  if (promotion) {
    notation += `=${promotion.toUpperCase()}`;
  }

  return notation;
}

// ------------------------------------------------------------
// Update game status
// ------------------------------------------------------------

export function getGameStatus(
  board,
  color,
  enPassantTarget = null
) {
  const colorName =
    color === "w" ? "White" : "Black";

  const inCheck =
    isKingInCheck(
      board,
      color
    );

  const checkmate =
    isCheckmate(
      board,
      color,
      enPassantTarget
    );

  const stalemate =
    isStalemate(
      board,
      color,
      enPassantTarget
    );

  if (checkmate) {
    return {
      status: "checkmate",
      message:
        `Checkmate! ${
          color === "w"
            ? "Black"
            : "White"
        } wins`,
    };
  }

  if (stalemate) {
    return {
      status: "stalemate",
      message: "Game Draw - Stalemate",
    };
  }

  if (inCheck) {
    return {
      status: "check",
      message:
        `${colorName} is in check`,
    };
  }

  return {
    status: "normal",
    message:
      `${colorName}'s turn`,
  };
}