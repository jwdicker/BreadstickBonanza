class LoadScene extends Phaser.Scene {
    
    constructor() {
        super("load");
    }

    create() {
        keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        console.log("Loaded");

        this.scene.start("play");
    }
}