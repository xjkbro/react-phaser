import Phaser from "phaser";

const gameWidth = 800;
const gameHeight = 600;

const GROUND = "ground";
const BACKGROUND = "background";
const BIRD = "bird";
const PIPE = "pipe";
const FLAP = "flap";
const GLIDE = "glide";
const MESSAGE = "message";

const FRAME_RATE = 10;
const BIRD_GRAVITY = 980;
const BIRD_VELOCITY = -250;
const GROUND_VELOCITY = 1.5;
const FLAP_ANGLE = 25;
const GROUND_HEIGHT = 72;

const birdyX = gameWidth / 2;
const birdyY = gameHeight / 2;
const pipeWidth = 52;
const gap = 150;
const xGap = 250;

export default class NewFlaps extends Phaser.Scene {
    constructor() {
        super("flappy-bird");
    }
    preload() {
        this.load.image("ground", "flappy-assets/sprites/base.png");
        this.load.image("background", "flappy-assets/sprites/background.png");
        this.load.image("pipe", "dunsparce/blue-pipe-420.png");
        this.load.image("startMsg", "flappy-assets/sprites/message.png");
        this.load.image("gameover", "dunsparce/gameover.png");
        this.load.spritesheet("bird", "dunsparce/dunsparce72x32.png", {
            frameWidth: 72,
            frameHeight: 32,
        });
    }
    create() {
        this.score = 0;
        this.countPipe = 0;
        this.isPaused = true;
        this.gameOver = false;

        this.createBackground();
        this.message = this.createMessage("startMsg");

        this.ground = this.createGround();
        this.pipes = this.initialPipes();

        this.scoreText = this.add.text(20, 20, this.score, {
            fontFamily: "Nunito",
            fontSize: 60,
            color: "#fff",
        });

        this.player = this.physics.add.sprite(birdyX, birdyY, "bird");

        this.player.setCollideWorldBounds(true);
        this.physics.pause();
        this.anims.create({
            key: FLAP,
            frames: this.anims.generateFrameNumbers(BIRD, { start: 0, end: 2 }),
            frameRate: FRAME_RATE,
            repeat: -1,
        });

        this.anims.create({
            key: GLIDE,
            frames: [{ key: BIRD, frame: 0 }],
            frameRate: FRAME_RATE,
        });
        this.cursors = this.input.keyboard.createCursorKeys();
        this.player.body.setGravityY(300);
        this.physics.add.existing(this.ground, true);
        this.physics.add.collider(
            this.player,
            this.pipes,
            this.collision,
            null,
            this
        );
        this.physics.add.collider(
            this.player,
            this.ground,
            this.collision,
            null,
            this
        );
    }
    update() {
        if (!this.gameOver) {
            this.flap();
            this.moveGround();
            if (!this.isPaused) this.infinitePipes();
        } else if (this.cursors.space.isDown) {
            this.scene.restart();
        }
    }

    flap() {
        // if game is over and space is pressed => restart game
        if (this.cursors.space.isDown && this.gameOver == true) {
            this.scene.restart();
        }
        // if game is not over, look for space press or left mouse click to flap.
        if (
            this.cursors.space.isDown ||
            (this.input.activePointer.leftButtonDown() &&
                this.gameOver == false)
        ) {
            if (this.isPaused) {
                this.physics.resume();
                this.isPaused = false;
                this.message.visible = false;
            }

            this.player.setVelocityY(BIRD_VELOCITY);
            this.player.anims.play(FLAP, true);
            this.player.angle = -FLAP_ANGLE;
        } else if (!this.player.body.touching.down && !this.isPaused) {
            this.player.angle += 1;
        }
    }
    moveGround() {
        // if game is not over, move ground
        if (!this.gameOver) this.ground.tilePositionX += GROUND_VELOCITY;
    }

    infinitePipes() {
        // get the children of the pipe group
        let children = this.pipes.getChildren();

        children.forEach((child) => {
            if (child instanceof Phaser.GameObjects.Sprite) {
                child.refreshBody();
                child.x += -2;
                // when one set of pipe is just shown
                if (child.x <= gameWidth && !child.drawn) {
                    this.countPipe += 1;
                    child.drawn = true;
                    if (this.countPipe >= 2) {
                        let randoPos = this.randomPipes();
                        console.log("Create Pipe Set");
                        this.pipes
                            .create(gameWidth + xGap, randoPos[0], "pipe")
                            .setScale(1)
                            .refreshBody();

                        this.pipes
                            .create(gameWidth + xGap, randoPos[1], "pipe")
                            .setScale(1, -1) //flips asset upside down
                            .refreshBody();

                        this.countPipe = 0;
                    }
                }
                // checks if this child is out of canvas and destroys if it is
                if (child.x <= -50) {
                    console.log("Destroyed one " + this.countPipe);
                    child.destroy();
                }
                //checks if child has crossed birds position, if so add 1 to score
                if (
                    child.x < birdyX &&
                    !this.gameOver &&
                    child.texture.key == "pipe" &&
                    !child.scored
                ) {
                    //checks
                    child.scored = true;
                    this.score += 0.5;
                    this.scoreText.setText(this.score);
                    console.log("score:", this.score);
                }
            }
        });
    }
    createBackground() {
        const platforms = this.physics.add.staticGroup();
        const { width, height } = this.scale;
        platforms
            .create(width * 0.2, height * 0.4, BACKGROUND)
            .setScale(1.75)
            .refreshBody();
        platforms
            .create(width * 0.8, height * 0.4, BACKGROUND)
            .setScale(1.75)
            .refreshBody();
        return platforms;
    }
    initialPipes() {
        let platforms = this.physics.add.staticGroup();
        var pipePos = gameWidth + 2 * xGap;
        let pos = this.randomPipes();
        // bottom placable at 260+gap to height
        platforms.create(pipePos, pos[0], "pipe").setScale(1).refreshBody();
        platforms.create(pipePos, pos[1], "pipe").setScale(1, -1).refreshBody();
        return platforms;
    }
    createGround() {
        const { width, height } = this.scale;
        const x = width * 0.5;
        const y = height - GROUND_HEIGHT * 0.3;
        const ground = this.add.tileSprite(x, y, width, GROUND_HEIGHT, GROUND);

        return ground;
    }
    createMessage(msg) {
        const { width, height } = this.scale;

        return this.add.image(width * 0.5, height * 0.3, msg);
    }
    randomPipes() {
        let safePadding = 90;
        let min = Math.ceil(safePadding + gap / 2);
        let max = Math.floor(gameHeight - safePadding - gap / 2);
        let ran = Math.floor(Math.random() * (max - min + 1)) + min;
        let rantop = ran - (gap / 2 + 200);
        let ranbot = ran + (gap / 2 + 200);
        console.log(ranbot, rantop);
        return [ranbot, rantop];
    }

    collision(player) {
        console.log("sss");
        this.gameIsOver(player);
    }
    gameIsOver(player) {
        this.physics.pause();
        player.setTint(0xff0000);
        this.gameOver = true;
        console.log("GAMEOVER");
        this.createMessage("gameover");
    }
    endGame() {
        this.gameOver = true;
        this.physics.pause();
        console.log("game paused");
        this.player.y = 450;
    }
}
