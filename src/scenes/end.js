// End scene
class End extends Phaser.Scene {

    constructor() {
        super("end");
    }

    create() {
        keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

        console.log("scoreEnd: " + scoreEnd);
        this.score = scoreEnd;
        this.add.image(0, 0, 'phone').setOrigin(0, 0);
        keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        var endConfig = {
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
        var end = this.add.sprite(87, 110, "end").play("endAnimation");
        end.setOrigin(0, 0);

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
            this.scene.start("play");
        });
    }
}