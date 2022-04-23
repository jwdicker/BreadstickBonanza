// Scene where the game is played
class Play extends Phaser.Scene {

    constructor() {
        super("play");
    }

    create() {
        // Background setup
        this.background = this.add.tileSprite(0, 0, game.config.width, game.config.height, "background").setOrigin(0, 0);

        // Player setup
        this.player = new Chef(this, game.config.width / 2, game.config.height - UIDistance - 50, "chef");

        // Meatball setup
        this.meatballs = this.add.group({
            runChildUpdate: true
        });
        this.maxMeatballs = 3;
        this.summonMeatball();

        // Input Setup
        keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    summonMeatball() {
        this.meatballs.add(new Meatball(this));
    }

    update() {
        this.background.tilePositionY -= bgMovementSpeed;

        this.player.update();
    }
}