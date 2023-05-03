import { useNavigate } from "react-router-dom";
import GameContext from "../utils/GameContext";
import { useContext, useState } from "react";
import { useEffect } from "react";

const TwoPlayer = () => {
  const [userInputRoom, setUserInputRoom] = useState("");
  const [joining, setJoining] = useState(false);
  const { roomID, gameSocket, setUserVal, joinRoom, CreateRoom } =
    useContext(GameContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (gameSocket) {
      gameSocket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.status === "success") {
          setUserVal(data.user);
        }
        if (data.message === "Start") {
          navigate(`/onlineGame/${roomID}`);
        }
      };
    }
    // Clean up the WebSocket event listener when the component is unmounted
    return () => {
      if (gameSocket) {
        gameSocket.onmessage = null;
      }
    };
  }, [gameSocket]);
  {
    if (roomID && !joining) {
      return (
        <>
          <h3 className="mb-6 text-2xl lg:text-3xl">Room Code</h3>
          <p className="w-56 w-100px block mx-auto bg-black hover:bg-gray-700 text-white  text-2xl font-bold py-2 px-4 rounded">
            {roomID}
          </p>
          <p className="my-4 text-xl">
            Send room code your friend and play with him 😎
          </p>
        </>
      );
    } else if (joining) {
      return (
        <>
          <h3 className="mb-6 text-2xl lg:text-3xl">Enter Room Code</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              console.log(userInputRoom);
              joinRoom(userInputRoom);
            }}
          >
            <input
              type="text"
              value={userInputRoom}
              onChange={(e) => setUserInputRoom(e.target.value)}
              className="w-56 block mx-auto my-4 bg-black hover:bg-gray-700 text-white  text-2xl font-bold py-2 px-4 rounded"
            />
            <button className="w-56 block mx-auto my-4 bg-black hover:bg-gray-700 text-white  text-2xl font-bold py-2 px-4 rounded">
              Join Room
            </button>
          </form>
          <p className="my-4 text-xl">
            Enter room code of your friends' room and play with him 😎
          </p>
        </>
      );
    } else {
      return (
        <>
          <h3 className="mb-6 text-2xl lg:text-3xl">Select Option</h3>
          <div className="mt-16 flex flex-col">
            <button
              onClick={() => setJoining(true)}
              className="w-56 block mx-auto my-4 bg-black hover:bg-gray-700 text-white  text-2xl font-bold py-2 px-4 rounded"
            >
              Join Room
            </button>
            <button
              onClick={() => CreateRoom()}
              className="w-56 w-100px block mx-auto bg-black hover:bg-gray-700 text-white  text-2xl font-bold py-2 px-4 rounded"
            >
              Create Room
            </button>
          </div>
        </>
      );
    }
  }
};

export default TwoPlayer;
