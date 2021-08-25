import React, { Component } from "react";
import Phaser from "phaser";
import { IonPhaser } from "@ion-phaser/react";
import HelloWorldScene from "./scene/HelloWorldScene";

class Game extends Component {
    state = {
        initialize: true,
        game: {
            width: 800,
            height: 600,
            physics: {
                default: "arcade",
                arcade: {
                    gravity: { y: 200 },
                },
            },
            scene: [HelloWorldScene],
        },
    };
    render() {
        const { initialize, game } = this.state;
        return <IonPhaser game={game} initialize={initialize} />;
    }
}

export default Game;
