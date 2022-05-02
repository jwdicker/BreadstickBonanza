// Scene that loads all assets and sets global input devices
class LoadScene extends Phaser.Scene {

    constructor() {
        super("load");
    }

    // Loads images
    preload() {
        // loading bar
        // see: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/loader/
        let loadingBar = this.add.graphics();
        let loadX = {
            min: UIDistance,
            max: game.config.width - 2 * UIDistance
        }
        this.load.on('progress', (value) => {
            loadingBar.clear();                                 // reset fill/line style
            loadingBar.fillStyle(0xFFFFFF, 1);                  // (color, alpha)
            loadingBar.fillRect(loadX.min, gameCanvasConfig.getCenter().y, loadX.max * value, 5);  // (x, y, w, h)
        });
        this.load.on('complete', () => {
            loadingBar.destroy();
        });

        // Audio Loading
        // Music
        this.load.audio("endtrack", "assets/backgroundtheme.wav");
        this.load.audio("soundtrack", "assets/cutetheme.mp3");
        
        // SFX
        this.load.audio("sfx_bread", "assets/breadshot.wav");
        this.load.audio("sfx_explode", "assets/explosion.wav");
        this.load.audio("sfx_select", "assets/select.wav");
        this.load.audio("sfx_die", "assets/chardeath.wav");
        this.load.audio("sfx_walk", "assets/footsteps.wav");
        this.load.audio("sfx_wave_inc", "assets/waves.wav");

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
            frameWidth: 70,
            frameHeight: 136
        });
        this.load.spritesheet('walkright', './assets/walkright_sheet.png', {
            frameWidth: 70,
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

    }

    create() {
        console.log("Loaded");

        this.scene.start("menu");
    }
}