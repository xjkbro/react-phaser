import React, { Component } from "react";
import Phaser from "phaser";
import { IonPhaser } from "@ion-phaser/react";
import HelloWorldScene from "./scene/HelloWorldScene";
import { SpinnyBoy } from "./scene/SpinnyBoy";
import FirstGame from "./scene/FirstGame";
import TestGame from "./scene/TestGame";
import Flappy from "./scene/Flappy";
import FlappyBird from "./scene/FlappyBird";

class Game extends Component {
    GameState = {
        initialize: true,
        game: {
            type: Phaser.AUTO,
            autoCenter: true,
            width: 800,
            height: 600,
            // width: 400,
            // height: 600,
            physics: {
                default: "arcade",
                arcade: {
                    gravity: { y: 200 },
                },
            },
            scene: FirstGame,
        },
    };

    render() {
        const { initialize, game } = this.GameState;
        return <IonPhaser game={game} initialize={initialize} />;
    }
}

export default Game;
