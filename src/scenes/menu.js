// Scene that displays menu and buttons
class Menu extends Phaser.Scene {

    constructor() {
        super("menu");
    }

    create() {
        this.add.image(0, 0, 'phone').setOrigin(0, 0);
        keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.add.image(87, 110, 'menu').setOrigin(0, 0);
    }

    update() {
        console.log("Menu");

        if (Phaser.Input.Keyboard.JustDown(keyUp)) {
            this.scene.start("tutorial");
        }
    }
}