class Play extends Phaser.Scene {

    constructor() {
        super("play");
    }

    create() {
        // Background setup
        this.background = this.add.tileSprite(0, 0, game.config.width, game.config.height, "background").setOrigin(0, 0);

        // Meatball setup
        this.meatballs = new Meatball(this, Math.random() * game.config.width, 0, "meatball");
    }

    update() {
        this.background.tilePositionY -= bgMovementSpeed;

        this.meatballs.update();
    }
}