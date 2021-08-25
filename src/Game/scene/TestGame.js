import Phaser from "phaser";

export default class FirstGame extends Phaser.Scene {
    constructor() {
        super("hello-world");
        this.platforms;
        this.scoreText;
        this.bombs;
        this.player;
        this.stars;
        this.cursors;
        this.score = 0;
    }

    preload() {
        this.load.image("sky", "assets/sky.png");
        this.load.image("ground", "./assets/platform.png");
        this.load.image("star", "./assets/star.png");
        this.load.image("bomb", "./assets/bomb.png");
        this.load.spritesheet("dude", "./assets/dude.png", {
            frameWidth: 32,
            frameHeight: 48,
        });
    }

    create() {}

    update() {}
}
