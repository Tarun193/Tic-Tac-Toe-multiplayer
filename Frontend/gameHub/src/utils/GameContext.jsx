import { createContext, useState, useEffect } from "react";
import Board from "../Components/Game/Board";

const GameContext = createContext();

export default GameContext;

export const GameProvider = ({ children }) => {
  const [roomID, setRoomID] = useState(null);
  const [gameSocket, setGameSocket] = useState(null);
  const [userVal, setUserVal] = useState("");
  const CreateRoom = async () => {
    const response = await fetch("http://127.0.0.1:8000/createRoom");
    const data = await response.json();
    setRoomID(data.room);
    setGameSocket(new WebSocket(`ws://127.0.0.1:8000/ws/game/${data.room}/`));
  };

  const joinRoom = (ID) => {
    setRoomID(ID);
    setGameSocket(new WebSocket(`ws://127.0.0.1:8000/ws/game/${ID}/`));
  };

  const sendMove = (board, user) => {
    if (gameSocket) {
      const data = JSON.stringify({
        type: "move",
        Board: board,
        user: user,
      });
      gameSocket.send(data);
    }
  };

  const sendMessage = (Message) => {
    if (gameSocket) {
      const data = JSON.stringify({
        type: "message",
        user: userVal,
        message: Message,
      });
      gameSocket.send(data);
    }
  };
  const contextData = {
    roomID: roomID,
    gameSocket: gameSocket,
    userVal: userVal,
    setUserVal: setUserVal,
    joinRoom: joinRoom,
    CreateRoom: CreateRoom,
    sendMove: sendMove,
    sendMessage: sendMessage,
  };

  return (
    <GameContext.Provider value={contextData}>{children}</GameContext.Provider>
  );
};
