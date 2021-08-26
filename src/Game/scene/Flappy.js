import Phaser from "phaser";

export default class Flappy extends Phaser.Scene {
    constructor() {
        super("flappy");
        this.score = 0;
    }

    preload() {
        this.load.image("sky", "assets/sky.png");
        this.load.image("ground", "assets/platform.png");
        this.load.image("player", "flappy-assets/dunsparce.png");
    }

    create() {
        // background image - sky
        this.add.image(400, 300, "sky");
        // top and bottom walls
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(400, 600, "ground").setScale(2).refreshBody();
        this.platforms.create(400, 0, "ground").setScale(2).refreshBody();

        this.player = this.physics.add.image(400, 300, "player");

        this.player.flipX = true;
        this.physics.pause();

        this.physics.add.collider(
            this.player,
            this.platforms,
            this.collided,
            null,
            this
        );
    }

    update() {
        this.cursors = this.input.keyboard.createCursorKeys();
        if (this.cursors.up.isDown) {
            this.player.setVelocityY(-330);
            this.physics.resume();
            this.gameOver = false;
        }
        if (this.cursors.down.isDown && this.gameOver == true) {
            this.restartGame();
        }
    }
    collided(player, platforms) {
        this.physics.pause();
        player.setTint(0xff0000);
        this.gameOver = true;
        console.log("GAMEOVER");
    }
}
