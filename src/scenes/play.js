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

        // Adjusting physics bounds
        this.physics.world.bounds.setTo(gameCanvasConfig.offset.x + 12.5, gameCanvasConfig.offset.y, gameCanvasConfig.width - 25, gameCanvasConfig.height);

        // phone border
        this.border = this.add.image(0, 0, 'phone2');
        this.border.setOrigin(0, 0);
        this.border.setDepth(10);

        // Background setup
        this.background = this.add.tileSprite(gameCanvasConfig.offset.x, gameCanvasConfig.offset.y, gameCanvasConfig.width, gameCanvasConfig.height, "background").setOrigin(0, 0);
        this.add.image(357, 595, 'floor');
        this.endOGame = false;

        // Player setup
        this.player = this.physics.add.sprite(gameCanvasConfig.getCenter().x, 0, "idle").setOrigin(0.5);
        this.player.y = gameCanvasConfig.height + gameCanvasConfig.offset.y - this.player.displayHeight / 2 - UIDistance - 70;
        this.player.body.setSize(this.player.displayWidth - 25, this.player.displayHeight - 25);
        this.player.setCollideWorldBounds(true);
        this.player.setDepth(1);

        this.anims.create({
            key: "idleAni",
            frameRate: 0,
            frames: this.anims.generateFrameNumbers("idle", {
                start: 0,
                end: 0
            }),
            repeat: -1
        });
        this.anims.create({
            key: "shootAni",
            frameRate: 0,
            frames: this.anims.generateFrameNumbers("shoot", {
                start: 0,
                end: 0
            }),
            repeat: -1
        });
        this.anims.create({ 
            key: 'walkleft', 
            frames: this.anims.generateFrameNames('chef_atlas', {      
                prefix: 'walkleft',
                start: 0,
                end: 2,
            }), 
            frameRate: 7,
            repeat: -1 
        });
        this.anims.create({ 
            key: 'walkright', 
            frames: this.anims.generateFrameNames('chef_atlas', {      
                prefix: 'walkright',
                start: 0,
                end: 2,
            }), 
            frameRate: 7,
            repeat: -1 
        });

        // Audio Setup
        this.soundtrack = this.sound.add("soundtrack", { loop: true, volume: 0.25 });
        this.explosion = this.sound.add("sfx_explode", { volume: 1.5 });
        this.shoot = this.sound.add("sfx_bread", { volume: 4 });
        this.wave = this.sound.add("sfx_wave_inc", { loop: false, volume: 1 });
        this.death = this.sound.add("sfx_die", { volume: 1 });
        this.walk = this.sound.add("sfx_walk", { loop: true, volume: 1 });

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
                this.shoot.play();
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
        this.meatSpeedMultiplier = startingMeatSpeedMultiplier;
        this.summonMeatball();

        // Collider setup
        this.physics.world.addCollider(this.player, this.border);
        this.physics.world.addOverlap(this.player, this.meatballs, this.gameEnd, null, this);
        this.physics.world.addOverlap(this.bread, this.meatballs, (bread, meatball) => {
            this.explosion.play();
            meatball.body = null;
            this.tweens.add({
                targets: meatball,
                alpha: 0,
                duration: 200
            });
            //meatball.alpha = 0;
            this.resetBread();
        }, null, this);

        // Scoring
        this.score = 1;
        // display
        let waveConfig = {
            fontFamily: 'Courier',
            fontSize: '35px',
            color: '#843605',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
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
        this.add.text(300, 125, "wave", waveConfig);
        this.scoreLeft = this.add.text(300, 160, this.score, scoreConfig);

        // Difficulty progression
        this.time.addEvent({
            delay: 10000,
            loop: true,
            callback: () => {
                if (!this.endOGame) {
                    this.wave.play();
                    this.maxMeatballs++;
                    this.meatSpeedMultiplier *= 1.1;
                    // update score
                    this.score += 1;
                    this.scoreLeft.text = this.score;
                }
            }
        });

        // Begin the soundtrack
        this.soundtrack.play();
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
        this.death.play();
        this.walk.stop();
        this.physics.world.pause();
        this.soundtrack.stop();
        scoreEnd = this.score;
        this.player.body = null;
        // fade out death scene
        this.tweens.add({
            targets: this.player,
            alpha: 0,
            duration: 200
        });
        this.time.delayedCall(1000, () => {
            this.scene.start('end', { fadeIn: true });
        })
        this.endOGame = true;
    }

    update() {
        if (!this.endOGame) {
            this.background.tilePositionY -= bgMovementSpeed;

            let playerVelocity = 0;
            if (keyUp.isDown) {
                // Players may not move while they're shooting
                this.player.anims.play("shootAni", true);
            } else {
                // Player Movement
                if (keyLeft.isDown) {
                    playerVelocity -= playerSpeed;
                }
                if (keyRight.isDown) {
                    playerVelocity += playerSpeed;
                }

                // Walking animations
                if (playerVelocity != 0) {
                    if (!this.walk.isPlaying) {
                        this.walk.play();
                    }

                    if (playerVelocity < 0) {
                        this.player.anims.play('walkleft', true);
                    } else {
                        this.player.anims.play('walkright', true);
                    }
                } else {
                    this.walk.pause();
                    this.player.anims.play("idleAni", true);
                }
            }
            this.player.setVelocityX(playerVelocity);

            // Bread reset
            if (this.breadFiring && this.bread.y < gameCanvasConfig.offset.y - this.bread.displayHeight) {
                this.resetBread();
            }
        }
    }
}