import { useContext, useEffect, useState } from "react";
import Board from "./Game/Board";
import GameContext from "../utils/GameContext";
import React from "react";

const Game = () => {
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState([]);
  const { sendMessage, gameSocket, userVal } = useContext(GameContext);

  // useEffect(() => {
  //   if (gameSocket) {
  //     gameSocket.onmessage = (event) => {
  //       const data = JSON.parse(event.data);
  //
  //     };
  //   }
  // }, [gameSocket, sendMessage]);

  return (
    <section className="flex justify-between">
      <Board messages={messages} setMessages={setMessages} />
      <section className="w-[30%] md:w-[25%]">
        <h2 className="text-2xl">Chat</h2>
        <div className="min-h-[80%] my-4 border-2 text-left px-1">
          {messages.map((message, index) => (
            <React.Fragment key={index}>
              <p>{message.user === userVal ? "You:" : "Opponent:"}</p>
              <p>{message.message}</p>
            </React.Fragment>
          ))}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage(userInput);
            setUserInput("");
          }}
        >
          <input
            type="text"
            className="px-1 w-[100%]"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
        </form>
      </section>
    </section>
  );
};

export default Game;
