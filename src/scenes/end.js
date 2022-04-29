// End scene
class End extends Phaser.Scene {

    constructor() {
        super("end");
    }

    create() {
        console.log("scoreEnd: " + scoreEnd);
        this.score = scoreEnd;
        this.add.image(0, 0, 'phone').setOrigin(0, 0);
        keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.add.image(87, 110, 'end').setOrigin(0, 0);

        // display
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '35px',
            color: '#76361A',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        // add to screen
        scoreEnd = this.add.text(245, 600, this.score, scoreConfig);
    }

    update() {
        console.log("End");

        if (Phaser.Input.Keyboard.JustDown(keyUp)) {
            this.scene.start("play");
        }
    }
}