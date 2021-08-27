import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Phaser from "phaser";
// import PhaserGame from "./PhaserGame/phaserGame";
import FirstGame from "./PhaserGame/FirstGame";

// const config = {
//     type: Phaser.AUTO,
//     parent: "phaser-example",
//     width: 800,
//     height: 600,
//     physics: {
//         default: "arcade",
//         arcade: {
//             gravity: { y: 200 },
//         },
//     },
//     scene: FirstGame,
// };

// const game = new Phaser.Game(config);
ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById("root")
);
