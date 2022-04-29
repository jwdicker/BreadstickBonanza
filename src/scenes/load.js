// Scene that loads all assets and sets global input devices
class LoadScene extends Phaser.Scene {

    constructor() {
        super("load");
    }

    // Loads images
    preload() {
        // Image & animation Loading
        // chef states
        this.load.spritesheet('idle', './assets/chef_idle.png', {
            frameWidth: 77,
            frameHeight: 137
        });
        this.load.spritesheet('shoot', './assets/chef_shoot.png', {
            frameWidth: 70,
            frameHeight: 136
        });
        this.load.spritesheet('walkleft', './assets/walkleft_sheet.png', {
            frameWidth: 64,
            frameHeight: 136
        });
        this.load.spritesheet('walkright', './assets/walkright_sheet.png', {
            frameWidth: 64,
            frameHeight: 136
        });

        // items
        this.load.image('meatball', './assets/meatball.png');
        this.load.image('breadstick', './assets/breadstick.png');

        // bg
        this.load.image('background', './assets/bg.png');
        this.load.image('floor', './assets/floor.png');

        // scenes
        this.load.spritesheet('menu', './assets/menu_sheet.png', {
            frameWidth: 540,
            frameHeight: 960
        });
        this.load.spritesheet('tutorial', './assets/tutorial_sheet.png', {
            frameWidth: 540,
            frameHeight: 960
        });
        this.load.spritesheet('end', './assets/end_sheet.png', {
            frameWidth: 540,
            frameHeight: 960
        });

        // phone border
        this.load.image('phone', './assets/phone.png');
        this.load.image('phone2', './assets/phone2.png');

        // Audio Loading
        this.load.audio("soundtrack", "assets/backgroundtheme.wav");
        this.load.audio("sfx_bread", "assets/breadshot.wav");
        this.load.audio("sfx_explode", "assets/explosion.wav");
    }

    create() {
        console.log("Loaded");

        this.scene.start("menu");
    }
}