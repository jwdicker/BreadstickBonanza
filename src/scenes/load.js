// Scene that loads all assets and sets global input devices
class LoadScene extends Phaser.Scene {
    
    constructor() {
        super("load");
    }

    create() {
        console.log("Loaded");

        this.scene.start("play");
    }
}