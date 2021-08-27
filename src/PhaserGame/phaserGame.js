import React from "react";
import Phaser from "phaser";
import FirstGame from "./FirstGame";

export default function phaserGame() {
    const config = {
        type: Phaser.AUTO,
        parent: "phaser-example",
        width: 800,
        height: 600,
        physics: {
            default: "arcade",
            arcade: {
                gravity: { y: 200 },
            },
        },
        scene: FirstGame,
    };
    return <div></div>;
}
