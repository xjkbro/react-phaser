import "./App.css";
import Game from "./Game/game";
import PhaserGame from "./PhaserGame/phaserGame";
import { useState, useEffect } from "react";

function App() {
    // const [chooseGame, setGame] = useState(0);

    return (
        <div className="App">
            <header className="App-header">
                <p>hello</p>
                <Game />
                <p>hi</p>
            </header>
        </div>
    );
}

export default App;
