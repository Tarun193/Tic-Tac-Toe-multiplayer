import "./App.css";
import Home from "./Components/Home";
import SinglePlayer from "./Components/SinglePlayer";
import TwoPlayer from "./Components/TwoPlayer";
import Game from "./Components/Game";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GameProvider } from "./utils/GameContext";

function App() {
  return (
    <GameProvider>
      <main className="flex h-screen items-center">
        <section className="flex flex-col shadow-md rounded-3xl bg-zinc-900 px-4 py-4 shadow-black-700/60 w-[70%] md:max-w-[90%] min-h-[50vh] md:min-h-[70vh] mx-auto text-center">
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/singlePlayer" element={<SinglePlayer />} />
              <Route path="/twoPlayer" element={<TwoPlayer />} />
              <Route path="/game/:level" element={<Game />} />
              <Route path="/onlineGame/:ID" element={<Game />} />
            </Routes>
          </Router>
        </section>
      </main>
    </GameProvider>
  );
}

export default App;
