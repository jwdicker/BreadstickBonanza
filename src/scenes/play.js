class Play extends Phaser.Scene {

    constructor() {
        super("play");
    }

    create() {
        // Background setup
        this.background = this.add.tileSprite(0, 0, game.config.width, game.config.height, "background").setOrigin(0, 0);
        this.bgMovementSpeed = 3;
    }

    update() {
        this.background.tilePositionY -= this.bgMovementSpeed;
    }
}