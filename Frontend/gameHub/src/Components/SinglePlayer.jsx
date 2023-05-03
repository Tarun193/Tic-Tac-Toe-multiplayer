import { useNavigate } from "react-router-dom";

const SinglePlayer = () => {
  const navigate = useNavigate();
  return (
    <>
      <h3 className="mb-6 text-2xl lg:text-3xl">Select Level</h3>
      <div className="mt-16 flex flex-col">
        <button
          onClick={() => navigate("/game/1")}
          className="w-36 block mx-auto my-4 bg-black hover:bg-gray-700 text-white  text-2xl font-bold py-2 px-4 rounded"
        >
          Easy
        </button>
        <button
          onClick={() => navigate("/game/2")}
          className="w-36 w-100px block mx-auto bg-black hover:bg-gray-700 text-white  text-2xl font-bold py-2 px-4 rounded"
        >
          Medium
        </button>
        <button
          onClick={() => navigate("/game/3")}
          className="w-36 my-4 block mx-auto bg-black hover:bg-gray-700 text-white  text-2xl font-bold py-2 px-4 rounded"
        >
          Hard
        </button>
      </div>
    </>
  );
};

export default SinglePlayer;
