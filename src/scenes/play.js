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

        // phone border
        this.border = this.add.image(0,0, 'phone2');
        this.border.setOrigin(0,0);
        this.border.setDepth(10);

        // Background setup
        this.background = this.add.tileSprite(gameCanvasConfig.offset.x, gameCanvasConfig.offset.y, gameCanvasConfig.width, gameCanvasConfig.height, "background").setOrigin(0, 0);
        this.endOGame = false;

        // Player setup
        this.player = this.physics.add.sprite(gameCanvasConfig.getCenter().x, 0, "idle").setOrigin(0.5);
        this.player.y = gameCanvasConfig.height + gameCanvasConfig.offset.y - this.player.displayHeight / 2 - UIDistance;
        this.player.setDepth(1);

        this.anims.create({
            key: "idleAni",
            frameRate: 0,
            frames: this.anims.generateFrameNumbers("idle", {
            start: 0, 
            end: 0}),
            repeat: -1
        });
        this.anims.create({
            key: "shootAni",
            frameRate: 0,
            frames: this.anims.generateFrameNumbers("shoot", {
            start: 0, 
            end: 0}),
            repeat: -1
        });
        this.anims.create({
            key: "walkleftAni",
            frameRate: 7,
            frames: this.anims.generateFrameNumbers("walkleft", {
            start: 0, 
            end: 2}),
            repeat: -1
        });
        this.anims.create({
            key: "walkrightAni",
            frameRate: 7,
            frames: this.anims.generateFrameNumbers("walkright", {
            start: 0, 
            end: 2}),
            repeat: -1
        });

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
            // update score
            this.score += 1;
            this.scoreLeft.text = this.score;  
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

        // Scoring
        this.score = 0;
        // display
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '50px',
            color: '#843605',
            align: 'center',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 100
        }
        // add to screen
        this.scoreLeft = this.add.text(300,150, this.score, scoreConfig);
    }

    // Destroys the meatball that the bread has collided with
    destroyMeatball() {
        for(let meatball of this.meatballs.getChildren()) {
            console.log(this.physics.world.overlap(this.bread, meatball));
        }
        this.resetBread();
    }

    // Summons a new meatball at the top of the screen
    summonMeatball() {
        this.meatballs.add(new Meatball(this));
    }

    // Resets the bread's off-screen position
    resetBread() {
        this.breadFiring = false;
        this.bread.x = this.breadPos.x;
        this.bread.y = this.breadPos.y;
    }

    // Handles what happens when the player hits a meatball
    gameEnd() {
        this.physics.world.pause();
        scoreEnd = this.score;
        this.scene.start('end');    
        this.endOGame = true;
    }

    update() {
        if (!this.endOGame) {
            this.background.tilePositionY -= bgMovementSpeed;

            // Player Movement
            let playerVelocity = 0;
            if (keyLeft.isDown) {
                this.player.anims.play("walkleftAni", true);
                playerVelocity -= playerSpeed;
            }
            if (keyRight.isDown) {
                this.player.anims.play("walkrightAni", true);
                playerVelocity += playerSpeed;
            }
            if (keyUp.isDown) {
                this.player.anims.play("shootAni", true);
            }
            if(!keyRight.isDown && !keyLeft.isDown){
                this.player.anims.play("idleAni", true);
            }
            this.player.setVelocityX(playerVelocity);

            // Bread reset
            if(this.breadFiring && this.bread.y < -this.bread.displayHeight / 2 -100) {
                this.resetBread();
            }
        }
    }
}