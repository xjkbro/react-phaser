import Phaser from "phaser";

const GROUND = "ground";
const BACKGROUND = "background";
const BIRD = "bird";
const PIPE = "pipe";
const FLAP = "flap";
const GLIDE = "glide";
const MESSAGE = "message";
// const PIPE_WIDTH = 52;
const PIPE_HEIGHT = 320;
const PIPE_GAP_HEIGHT = 120;
const PIPE_GAP_LENGTH = 180;
const PIPE_PAIRS = 30;
const GROUND_HEIGHT = 112;
const FRAME_RATE = 10;
const BIRD_GRAVITY = 980;
const BIRD_VELOCITY = -250;
const GROUND_VELOCITY = 1.5;
const FLAP_ANGLE = 25;

export default class FlappyBird extends Phaser.Scene {
    constructor() {
        super("flappy-bird");
    }
    preload() {
        this.load.image("ground", "flappy-assets/sprites/base.png");
        this.load.image("background", "flappy-assets/sprites/background.png");
        this.load.image("pipe", "flappy-assets/sprites/pipe.png");
        this.load.image("message", "flappy-assets/sprites/message.png");
        this.load.spritesheet("bird", "flappy-assets/sprites/bird.png", {
            frameWidth: 34,
            frameHeight: 24,
        });
    }
    create() {
        this.gameOver = false;
        this.createBackground();

        this.pipes = this.createPipe(200, 200);
        this.player = this.createPlayer();
        // this.pipes = this.physics.add.staticGroup();
        this.ground = this.createGround();
        this.message = this.createMessage();

        this.player.setGravityY(BIRD_GRAVITY);
        this.physics.pause();

        this.cursors = this.input.keyboard.createCursorKeys();

        this.physics.add.existing(this.ground, true);
        this.physics.add.collider(this.ground, this.player);

        this.physics.add.collider(this.ground, this.pipes);

        this.physics.add.collider(
            this.player,
            this.pipes,
            this.collidedPipe,
            null,
            this
        );
        this.physics.add.collider(
            this.player,
            this.ground,
            this.collidedFloor,
            null,
            this
        );
    }
    update() {
        this.flap();
        this.moveGround();
        // this.movePipes();
    }

    flap() {
        if (this.cursors.space.isDown && this.gameOver == true) {
            this.scene.restart();
        }
        if (
            this.cursors.space.isDown ||
            (this.input.activePointer.leftButtonDown() &&
                this.gameOver == false)
        ) {
            this.physics.resume();
            this.message.visible = false;
            this.player.setVelocityY(BIRD_VELOCITY);
            this.player.anims.play(FLAP, true);
            this.player.angle = -FLAP_ANGLE;
        } else if (!this.player.body.touching.down) {
            this.player.angle += 2;
        }
    }

    moveGround() {
        if (!this.gameOver) this.ground.tilePositionX += GROUND_VELOCITY;
    }

    movePipes() {
        // console.log(this.pipes.);
        // this.pipes.setY(0);
        if (!this.gameOver) this.pipes.incX(-GROUND_VELOCITY);
        // if (!this.gameOver) this.pipes.incY(0,));
    }

    // Create Background Group
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

    createPlayer() {
        const { width, height } = this.scale;
        const player = this.physics.add.sprite(width * 0.5, height * 0.5, BIRD);
        player.setCollideWorldBounds(true);

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

        return player;
    }

    createMessage() {
        const { width, height } = this.scale;

        return this.add.image(width * 0.5, height * 0.3, MESSAGE);
    }

    createGround() {
        const { width, height } = this.scale;
        const x = width * 0.5;
        const y = height - GROUND_HEIGHT * 0.3;
        const ground = this.add.tileSprite(x, y, width, GROUND_HEIGHT, GROUND);

        return ground;
    }

    // createPipes() {
    //     const pipes = this.physics.add.group();

    //     // let i = 0;
    //     const { width, height } = this.scale;

    //     for (let i = 0; i < PIPE_PAIRS; i += 1) {
    //         // while () {
    //         const y = Phaser.Math.Between(-420 * 0.6, 0); //This is the gap between Top and bottom pipes
    //         const deltaX = i * PIPE_GAP_LENGTH; //Thiss is the gap between pipes on X-axis

    //         const top = this.add.image(deltaX, y + height / 4, PIPE);
    //         top.flipY = true;

    //         const bottom = this.add.image(
    //             deltaX,
    //             y + height / 4 + PIPE_GAP_HEIGHT + PIPE_HEIGHT,
    //             PIPE
    //         );

    //         pipes.add(top);
    //         pipes.add(bottom);

    //         // i += 1;
    //     }

    //     return pipes;
    // }
    createPipe(x, y) {
        // const y = Phaser.Math.Between(-420 * 0.6, 0); //This is the gap between Top and bottom pipes
        // const deltaX = i * PIPE_GAP_LENGTH; //Thiss is the gap between pipes on X-axis
        // const pipes = this.physics.add.group();
        const pipe = this.physics.add.image(600, 500, PIPE);
        const pipe2 = this.physics.add.image(600, 10, PIPE);

        pipe2.flipY = true;
        pipe.body.velocity.x = -200;
        pipe2.body.velocity.x = -200;

        pipe.body.allowGravity = false;
        pipe2.body.allowGravity = false;
        // pipe.disableBody();

        // pipe.setCollideWorldBounds(true);
        // pipes.add(pipe);
        // pipes.add(pipe2);
        return pipe2;
    }
    createPipeSet() {}

    collidedFloor(player, ground) {
        // if (this.gameOver == true) return;

        // this.gameOver == true;

        this.gameIsOver(player);
        return;
    }
    collidedPipe(player, pipes) {
        console.log("sss");
        this.gameIsOver(player);
        return;
    }
    gameIsOver(player) {
        this.physics.pause();
        player.setTint(0xff0000);
        this.gameOver = true;
        console.log("GAMEOVER");
    }
}
