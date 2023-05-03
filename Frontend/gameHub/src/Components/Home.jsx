import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <h1 className="mt-5  mb-24 text-2xl font-extrabold dark:text-white lg:text-4xl md:text-3xl">
        Welcome To Tic-Tac-Toe
      </h1>
      <div>
        <h3 className="mb-6 text-2xl lg:text-3xl">Select Options</h3>
        <div>
          <button
            onClick={() => navigate("/singlePlayer")}
            className="w-56 block mx-auto my-4 bg-black hover:bg-gray-700 text-white  text-2xl font-bold py-2 px-4 rounded"
          >
            One Player
          </button>
          <button
            onClick={() => navigate("/twoPlayer")}
            className="w-56 block mx-auto bg-black hover:bg-gray-700 text-white  text-2xl font-bold py-2 px-4 rounded"
          >
            Play with Firend
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
