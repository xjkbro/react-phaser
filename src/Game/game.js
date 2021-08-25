import React, { Component } from "react";
import Phaser from "phaser";
import { IonPhaser } from "@ion-phaser/react";
import HelloWorldScene from "./scene/HelloWorldScene";
import { SpinnyBoy } from "./scene/SpinnyBoy";
import FirstGame from "./scene/FirstGame/FirstGame";

class Game extends Component {
    state = {
        initialize: true,
        game: {
            type: Phaser.AUTO,
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

    GameState = {
        initialize: true,
        game: {
            type: Phaser.AUTO,
            width: 800,
            height: 600,
            physics: {
                default: "arcade",
                arcade: {
                    gravity: { y: 300 },
                    debug: false,
                },
            },
            scene: [FirstGame],
        },
    };

    render() {
        let initialize, game;
        console.log(this.props.game);
        switch (this.props.game) {
            case 0:
                initialize = this.GameState.initialize;
                game = this.GameState.game;
                break;
            case 1:
                initialize = this.state.initialize;
                game = this.state.game;
                break;
            case 2:
                initialize = SpinnyBoy.initialize;
                game = SpinnyBoy.game;
                break;
            default:
                return <></>;
        }
        return <IonPhaser game={game} initialize={initialize} />;
    }
}

export default Game;
