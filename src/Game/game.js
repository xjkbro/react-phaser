import React, { Component } from "react";
import Phaser from "phaser";
import { IonPhaser } from "@ion-phaser/react";
import HelloWorldScene from "./scene/HelloWorldScene";
import { SpinnyBoy } from "./scene/SpinnyBoy";
import FirstGame from "./scene/FirstGame";
import TestGame from "./scene/TestGame";
import Flappy from "./scene/Flappy";
import FlappyBird from "./scene/FlappyBird";
import NewFlaps from "./scene/NewFlaps";

class Game extends Component {
    FirstGameState = {
        initialize: true,
        game: {
            type: Phaser.AUTO,
            autoCenter: true,
            width: 800,
            height: 600,
            physics: {
                default: "arcade",
                arcade: {
                    gravity: { y: 200 },
                },
            },
            scene: FirstGame,
        },
    };
    FlappyBirdState = {
        initialize: true,
        game: {
            type: Phaser.AUTO,
            autoCenter: true,
            width: 800,
            height: 600,
            physics: {
                default: "arcade",
                arcade: {
                    gravity: { y: 200 },
                },
            },
            scene: FlappyBird,
        },
    };
    NewFlapsState = {
        initialize: true,
        game: {
            type: Phaser.AUTO,
            autoCenter: true,
            width: 800,
            height: 600,
            physics: {
                default: "arcade",
                arcade: {
                    gravity: { y: 200 },
                },
            },
            scene: NewFlaps,
        },
    };

    render() {
        // const { initialize, game } = this.FirstGameState;
        return (
            <>
                <IonPhaser
                    game={this.NewFlapsState.game}
                    initialize={this.NewFlapsState.initialize}
                />
                {/* <IonPhaser
                game={this.FlappyBirdState.game}
                initialize={this.FlappyBirdState.initialize}
            /> */}
                {/* <IonPhaser
                    game={this.FirstGameState.game}
                    initialize={this.FirstGameState.initialize}
                /> */}
            </>
        );
    }
}

export default Game;
