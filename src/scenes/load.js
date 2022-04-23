// Scene that loads all assets and sets global input devices
class LoadScene extends Phaser.Scene {
    
    constructor() {
        super("load");
    }

    preload() {
        this.load.image('chef','./assets/chef_back.png');
        this.load.image('meatball','./assets/meatball.png');
        this.load.image('breadstick','./assets/breadstick.png');
        this.load.image('background','./assets/bg.png');
    }

    create() {
        console.log("Loaded");
        this.bg = this.add.tileSprite(0, 0, 540, 960, 'bg').setOrigin(0, 0);

        this.scene.start("play");
    }
}