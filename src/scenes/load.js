// Scene that loads all assets and sets global input devices
class LoadScene extends Phaser.Scene {
    
    constructor() {
        super("load");
    }

    // Loads images
    preload() {
        // chef states
        //this.load.image('idle','./assets/chef_idle.png');
        this.load.spritesheet('idle', './assets/chef_idle.png', {
            frameWidth: 77, 
            frameHeight: 137
        });
        //this.load.image('shoot','./assets/chef_shoot.png');
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
        this.load.image('meatball','./assets/meatball.png');
        this.load.image('breadstick','./assets/breadstick.png');
        // bg
        this.load.image('background','./assets/bg.png');
        // scenes
        this.load.image('menu','./assets/menu.png');
        this.load.spritesheet('tutorial', './assets/tutorial_sheet.png', {
            frameWidth: 540, 
            frameHeight: 960
        });
        this.load.image('end','./assets/end.png');
        this.load.image('phone','./assets/phone.png');
        this.load.image('phone2','./assets/phone2.png');
        this.load.image('phone_edges','./assets/phone_edges.png');

    }

    create() {
        console.log("Loaded");

        this.scene.start("menu");
    }
}