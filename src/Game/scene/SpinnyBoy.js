import Phaser from "phaser";

export const SpinnyBoy = {
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
        scene: {
            init: function () {
                this.cameras.main.setBackgroundColor("#24252A");
            },
            create: function () {
                this.helloWorld = this.add.text(
                    this.cameras.main.centerX,
                    this.cameras.main.centerY,
                    "Hello World",
                    {
                        font: "40px Arial",
                        fill: "#ffffff",
                    }
                );
                this.helloWorld.setOrigin(0.5);
            },
            update: function () {
                this.helloWorld.angle += 1;
            },
        },
    },
};
