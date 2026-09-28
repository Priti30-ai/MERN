function MoveHistory({ moves }) {

  const movePairs = [];

  for (let i = 0; i < moves.length; i += 2) {

    movePairs.push({
      number: i / 2 + 1,
      white: moves[i],
      black: moves[i + 1] || "",
    });

  }

  return (
    <div className="move-history">

      <h2>Move History</h2>

      {moves.length === 0 ? (

        <p>No moves yet</p>

      ) : (

        <div>

          {movePairs.map((move) => (

            <div
              className="move-row"
              key={move.number}
            >

              <span>
                {move.number}.
              </span>

              <span>
                {move.white}
              </span>

              <span>
                {move.black}
              </span>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default MoveHistory;