// Scene where the game is played
class Play extends Phaser.Scene {

    constructor() {
        super("play");
    }

    create() {
        // Input Setup
        keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

        // Background setup
        this.background = this.add.tileSprite(0, 0, game.config.width, game.config.height, "background").setOrigin(0, 0);
        this.endOGame = false;

        // Player setup
        this.player = this.physics.add.sprite(game.config.width / 2, 0, "chef").setOrigin(0.5);
        this.player.y = game.config.height - this.player.displayHeight / 2 - UIDistance - 80;
        this.player.setCollideWorldBounds(true);
        this.player.setDepth(1);

        // Bread setup
        this.breadFiring = false;
        this.breadPos = {
            x: -UIDistance,
            y: -UIDistance
        }
        this.bread = this.physics.add.sprite(this.breadPos.x, this.breadPos.y, "breadstick");
        this.bread.setOrigin(0.5);
        this.bread.setDepth(0.5);

        // Firing
        keyUp.on("down", () => {
            if (!this.endOGame && !this.breadFiring) {
                this.breadFiring = true;
                this.bread.x = this.player.x;
                this.bread.y = this.player.y;
                this.bread.setVelocityY(breadSpeed);
            }
        });

        // Meatball setup
        this.meatballs = this.add.group({
            runChildUpdate: true
        });
        this.maxMeatballs = startingMeatballs;
        this.summonMeatball();

        // Collider setup
        this.physics.world.addCollider(this.player, this.meatballs, this.gameEnd, null, this);
        this.physics.world.addCollider(this.bread, this.meatballs, (bread, meatball) => {
            meatball.body = null;
            meatball.alpha = 0;
            this.resetBread();
        }, null, this);

        keyDown.on("down", (event) => {
            if (this.endOGame) {
                this.scene.restart();
            }
        });

        // Difficulty progression
        this.time.addEvent({
            delay: 10000,
            loop: true,
            callback: () => {this.maxMeatballs++;}
        });

        // phone border
        this.add.image(0,0, 'phone2').setOrigin(0,0);
    }

    // Destroys the meatball that the bread has collided with
    destroyMeatball() {
        for(let meatball of this.meatballs.getChildren()) {
            console.log(this.physics.world.overlap(this.bread, meatball));
        }
        this.resetBread();
        // phone border over meatballs
        this.add.image(0,0, 'phone2').setOrigin(0,0);
    }

    // Summons a new meatball at the top of the screen
    summonMeatball() {
        this.meatballs.add(new Meatball(this));
        // phone border over meatball
        this.add.image(0,0, 'phone2').setOrigin(0,0);
    }

    // Resets the bread's off-screen position
    resetBread() {
        this.breadFiring = false;
        this.bread.x = this.breadPos.x;
        this.add.image(0,0, 'phone2').setOrigin(0,0);
        this.bread.y = this.breadPos.y;
    }

    // Handles what happens when the player hits a meatball
    gameEnd() {
        this.physics.world.pause();
        this.scene.start('end');    
        this.endOGame = true;
    }

    update() {
        if (!this.endOGame) {
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

            // Bread reset
            if(this.breadFiring && this.bread.y < -this.bread.displayHeight / 2) {
                this.resetBread();
            }
        }
    }
}