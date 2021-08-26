import React, { Component } from "react";
import Phaser from "phaser";
import { IonPhaser } from "@ion-phaser/react";
import HelloWorldScene from "./scene/HelloWorldScene";
import { SpinnyBoy } from "./scene/SpinnyBoy";
import FirstGame from "./scene/FirstGame";
import TestGame from "./scene/TestGame";
import Flappy from "./scene/Flappy";

class Game extends Component {
    GameState = {
        initialize: true,
        game: {
            type: Phaser.AUTO,
            width: 800,
            height: 600,
            physics: {
                default: "arcade",
                arcade: {
                    gravity: { y: 980 },
                    debug: false,
                },
            },
            scene: [Flappy],
        },
    };

    render() {
        const { initialize, game } = this.GameState;
        return <IonPhaser game={game} initialize={initialize} />;
    }
}

export default Game;
