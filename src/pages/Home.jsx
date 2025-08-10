import "./Home.css";
import { useState } from "react";
import api from "../api/api";

function Home() {
  const [steamId, setSteamId] = useState("");
  const [joke, setJoke] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/jokes", {
        steamId,
      });
      console.log(response.data);
      setJoke(response.data);
    } catch (error) {
      con;
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();

    setJoke("");
  };

  return (
    <div className="JokeContainer">
      <h1>ZoAI</h1>

      {!joke ? (
        <form onSubmit={handleSubmit}>
          <label htmlFor="steamId">SteamID:</label>
          <input
            type="text"
            value={steamId}
            onChange={(e) => setSteamId(e.target.value)}
          />
          <button className="subBtn" type="submit">
            Send
          </button>
        </form>
      ) : (
        <div className="jokeResponse">
          <div className="jokeValue">{joke.joke}</div>
          <button className="newBtn" onClick={handleClick}>
            New Joke
          </button>
        </div>
      )}
    </div>
  );
}

export default Home;
