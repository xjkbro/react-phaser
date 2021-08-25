import "./App.css";
import Game from "./Game/game";
import { useState, useEffect } from "react";

function App() {
    const [chooseGame, setGame] = useState(0);

    return (
        <div className="App">
            <header className="App-header">
                <ul>
                    <li onClick={() => setGame(0)}>Zero</li>
                    <li onClick={() => setGame(1)}>One</li>
                    <li onClick={() => setGame(2)}>Two</li>
                </ul>
                <Game game={chooseGame} />
            </header>
        </div>
    );
}

export default App;
