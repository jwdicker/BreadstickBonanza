// End scene
class End extends Phaser.Scene {

    constructor() {
        super("end");
    }

    create() {
        // key input
        keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);

        console.log("scoreEnd: " + scoreEnd);
        this.score = scoreEnd;

        // img + anim
        this.add.image(0, 0, 'phone').setOrigin(0, 0);
        let endConfig = {
            key: "endAnimation",
            frames: this.anims.generateFrameNumbers("end", {
                start: 0,
                end: 1,
                first: 0
            }),
            frameRate: 2,
            repeat: -1
        };
        this.anims.create(endConfig);
        let end = this.add.sprite(87, 110, "end").play("endAnimation");
        end.setOrigin(0, 0);
        // sounds
        this.soundtrack = this.sound.add("endtrack", {loop: true, volume: 0.25});
        this.soundtrack.play();

        // display
        let scoreConfig = {
            fontFamily: 'Courier Bold',
            fontSize: '35px',
            color: '#4b3e37',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        // add to screen
        scoreEnd = this.add.text(316, 647, this.score, scoreConfig);

        console.log("End");
        keyDown.on("down", () => {
            this.soundtrack.stop();
            this.sound.play('sfx_select');
            this.scene.start("play");
        });
    }

    update() {
        // stop endtrack for replay
        keyDown.on("down", () => {
            this.soundtrack.stop();
        });
    }
}