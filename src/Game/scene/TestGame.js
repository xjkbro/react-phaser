import Phaser from "phaser";

export default class FirstGame extends Phaser.Scene {
    constructor() {
        super("hello-world");
        this.score = 0;
    }

    preload() {
        this.load.image("sky", "assets/sky.png");
        this.load.image("ground", "assets/platform.png");
        this.load.image("star", "assets/star.png");
        this.load.image("bomb", "assets/bomb.png");
        this.load.spritesheet("dude", "assets/noBKG_KnightRun_strip.png", {
            frameWidth: 96,
            frameHeight: 32,
        });
    }

    create() {
        this.add.image(400, 300, "sky");
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(400, 268, "ground").setScale(2).refreshBody();

        this.player = this.physics.add.sprite(100, 200, "dude");

        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, this.platforms);
        this.anims.create({
            key: "left",
            frames: this.anims.generateFrameNumbers("dude", {
                start: 0,
                end: 7,
            }),
            frameRate: 30,
            repeat: -1,
        });
        this.anims.create({
            key: "right",
            frames: this.anims.generateFrameNumbers("dude", {
                start: 9,
                end: 16,
            }),
            frameRate: 30,
            repeat: -1,
        });
    }

    update() {
        this.cursors = this.input.keyboard.createCursorKeys();
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);

            this.player.anims.play("left", true);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);

            this.player.anims.play("right", true);
        } else {
            this.player.setVelocityX(0);

            this.player.anims.play("turn");
        }

        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-330);
        }
    }
}
