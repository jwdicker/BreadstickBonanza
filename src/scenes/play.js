// Scene where the game is played
class Play extends Phaser.Scene {

    constructor() {
        super("play");
    }

    create() {
        // Background setup
        this.background = this.add.tileSprite(0, 0, game.config.width, game.config.height, "background").setOrigin(0, 0);
        this.endOGame = false;

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

        // Breadstick setup
        this.breadstick = this.physics.add.sprite(game.config.width / 2, 0, "breadstick").setOrigin(0, 0);
        this.breadstick.y = game.config.height - this.player.displayHeight - UIDistance;

        // Collider setup
        this.physics.world.addCollider(this.player, this.meatballs, this.gameEnd, null, this);

        // Input Setup
        keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

        keyDown.on("down", (event) => {
            if(this.endOGame) {
                this.scene.restart();
            }
        });
    }

    // Summons a new meatball at the top of the screen
    summonMeatball() {
        this.meatballs.add(new Meatball(this));
    }

    // Handles what happens when the player hits a meatball
    gameEnd() {
        this.physics.world.pause();
        console.log("game over");
        this.endOGame = true;
    }

    update() {
        if(!this.endOGame)
        {
            this.background.tilePositionY -= bgMovementSpeed;

            // Player Movement
            let playerVelocity = 0;
            if (keyLeft.isDown) {
                playerVelocity -= playerSpeed;
            }

            if (keyRight.isDown) {
                playerVelocity += playerSpeed;
            }
            this.player.setVelocityX(playerVelocity);   
            this.breadstick.setVelocityX(playerVelocity);
        }
    }
}