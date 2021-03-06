// Scene that displays menu and buttons
class Menu extends Phaser.Scene {

    constructor() {
        super("menu");
    }

    create() {
        this.add.image(0, 0, 'phone').setOrigin(0, 0);
        keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        let menuConfig = {
            key: "menuAnimation",
            frames: this.anims.generateFrameNumbers("menu", {
                start: 0,
                end: 5,
                first: 0
            }),
            frameRate: 7,
            repeat: -1
        };

        this.anims.create(menuConfig);
        let menu = this.add.sprite(87, 110, "menu").play("menuAnimation");
        menu.setOrigin(0, 0);

        console.log("Menu");

        keyUp.on("down", () => {
            this.sound.play('sfx_select');
            this.scene.start("tutorial");
        });
    }
}