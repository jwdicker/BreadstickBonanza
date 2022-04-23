// Scene that loads all assets and sets global input devices
class LoadScene extends Phaser.Scene {
    
    constructor() {
        super("load");
    }

    // Loads images
    preload() {
        this.load.image('chef','./assets/chef_back.png');
        this.load.image('meatball','./assets/meatball.png');
        this.load.image('breadstick','./assets/breadstick.png');
        this.load.image('background','./assets/bg.png');
    }

    create() {
        console.log("Loaded");

        this.scene.start("play");
    }
}