// Scene that loads all assets and sets global input devices
class LoadScene extends Phaser.Scene {
    
    constructor() {
        super("load");
    }

    // Loads images
    preload() {
        this.load.image('chef','./assets/chef_idle.png');
        this.load.image('meatball','./assets/meatball.png');
        this.load.image('breadstick','./assets/breadstick.png');
        this.load.image('background','./assets/bg.png');
        this.load.image('menu','./assets/menu.png');
        this.load.spritesheet('tutorial', './assets/tutorial_sheet.png', {
            frameWidth: 540, 
            frameHeight: 960
        });
        this.load.image('end','./assets/end.png');

    }

    create() {
        console.log("Loaded");

        this.scene.start("menu");
    }
}