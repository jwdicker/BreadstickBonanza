// Scene where the game is played
class Play extends Phaser.Scene {

    constructor() {
        super("play");
    }

    create() {
        // Background setup
        this.background = this.add.tileSprite(0, 0, game.config.width, game.config.height, "background").setOrigin(0, 0);

        // Player setup
        this.player = new Chef(this, game.config.width / 2, game.config.height - UIDistance, "chef");

        // Meatball setup
        this.meatballs = new Meatball(this, Math.random() * game.config.width, 0, "meatball");
    }

    update() {
        this.background.tilePositionY -= bgMovementSpeed;

        this.player.update();

        this.meatballs.update();

        if(Phaser.Input.Keyboard.JustDown(keyLeft)) {
            console.log("foo");
        }
    }
}