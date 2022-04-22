// Class that handles chef movement and stats
class Chef extends Phaser.GameObjects.Sprite {

    constructor(scene, posX, posY, texture){
        super(scene, posX, posY, texture);
        scene.add.existing(this);
    }

    update() {
        if(keyLeft.isDown && this.x > this.width / 2) {
            this.x -= playerSpeed;
        }

        if(keyRight.isDown && this.x < game.config.width - this.width / 2) {
            this.x += playerSpeed;
        }
    }

}