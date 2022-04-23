// Scene where the game is played
class Play extends Phaser.Scene {

    constructor() {
        super("play");
    }

    create() {
        // Background setup
        this.background = this.add.tileSprite(0, 0, game.config.width, game.config.height, "background").setOrigin(0, 0);

        // Player setup
        this.player = this.physics.add.sprite(game.config.width / 2, 0, "chef").setOrigin(0, 0);
        this.player.y = game.config.height - this.player.displayHeight - UIDistance;
        this.player.setCollideWorldBounds(true);

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

        // Player Movement
        let playerVelocity = 0;
        if(keyLeft.isDown) {
            playerVelocity -= playerSpeed;
        }

        if(keyRight.isDown) {
            playerVelocity += playerSpeed;
        }
        this.player.setVelocityX(playerVelocity);
    }
}