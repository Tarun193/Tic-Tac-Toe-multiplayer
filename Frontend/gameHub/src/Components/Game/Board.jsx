import Square from "./Square";
import { useEffect, useState } from "react";
import { useContext } from "react";
import GameContext from "../../utils/GameContext";
import { Container } from "postcss";
const Board = ({ messages, setMessages }) => {
  const [Board, seatBoard] = useState(["", "", "", "", "", "", "", "", ""]);
  const { gameSocket, sendMove, userVal } = useContext(GameContext);
  const [turn, setTurn] = useState(userVal === "X" ? true : false);
  const [winner, setWinner] = useState("");
  const [winningBlocks, setWinningBlocks] = useState([]);

  useEffect(() => {
    if (gameSocket) {
      gameSocket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.type === "move" && data.user !== userVal && winner === "") {
          const newBoard = [...data.Board];
          seatBoard(newBoard);
          setTurn(true);
          checkWin(newBoard);
        }
        if (data.type === "message") {
          setMessages((messages) => [
            ...messages,
            { user: data.user, message: data.message },
          ]);
        }
      };
    }
    return () => {
      if (gameSocket) {
        gameSocket.onmessage = null;
      }
    };
  }, [gameSocket, seatBoard]);

  const checkWin = (Board) => {
    // Checking Rows
    console.log(Board);
    for (let i = 0; i < 3; i++) {
      if (
        Board[i * 3 + 0] !== "" &&
        Board[i * 3 + 0] === Board[i * 3 + 1] &&
        Board[i * 3 + 1] === Board[i * 3 + 2]
      ) {
        setWinner(Board[i * 3 + 0]);
        setWinningBlocks([i * 3 + 1, i * 3 + 2, i * 3 + 3]);
        return;
      }
    }
    // Checking columns.
    for (let i = 0; i < 3; i++) {
      if (
        Board[i + 0 * 3] !== "" &&
        Board[0 * 3 + i] === Board[1 * 3 + i] &&
        Board[1 * 3 + i] === Board[2 * 3 + i]
      ) {
        setWinner(Board[i + 0 * 3]);
        setWinningBlocks([0 * 3 + i, 1 * 3 + i, 2 * 3 + i]);
        return;
      }
    }
    // Checking Diagonals
    if (Board[0] !== "" && Board[0] === Board[4] && Board[4] === Board[8]) {
      setWinner(Board[0]);
      setWinningBlocks([0, 4, 8]);
      return;
    }
    if (Board[2] !== "" && Board[2] === Board[4] && Board[4] === Board[6]) {
      setWinner(Board[2]);
      setWinningBlocks([2, 4, 6]);
      return;
    }
    let empty = 0;
    for (let i = 0; i < 9; i++) {
      if (Board[i] === "") {
        empty++;
      }
    }
    if (empty === 0) {
      return;
    }
  };

  const handleClick = (id) => {
    if (winner) {
      alert("Game Over");
    }
    if (Board[id] === "" && turn && winner === "") {
      const newBoard = [...Board];
      newBoard[id] = userVal;
      seatBoard(newBoard);
      sendMove(newBoard, userVal);
      setTurn(false);
      checkWin(newBoard);
    } else if (!turn) {
      alert("It's not your Turn");
    } else {
      alert("Invalid Move");
    }
  };
  const style = {
    color: turn ? "green" : "red",
  };
  return (
    <section className="text-left md:max-w-[80%] m-auto">
      <h3 className="mb-6 text-2xl lg:text-3xl text-center">Let's Play</h3>
      <section className="grid grid-cols-3 grid-rows-3 gap-1">
        {Board.map((value, index) => (
          <Square
            style={
              winningBlocks.includes(index)
                ? {
                    backgroundColor: winner === userVal ? "green" : "red",
                  }
                : null
            }
            value={value}
            key={index}
            index={index}
            handleClick={handleClick}
          />
        ))}
      </section>
      <section className="text-center">
        {winner !== "" ? (
          <>
            <p>
              {winner === userVal
                ? "Whoo You won the game!!!"
                : "Sorry, you lost the game, better luck next time"}
            </p>
          </>
        ) : null}
      </section>
      <p style={style}>Turn: {turn ? "Your" : "Opponent"}</p>
      <p>You: {userVal}</p>
      <p>Oppenent: {userVal === "X" ? "O" : "X"}</p>
    </section>
  );
};

export default Board;
