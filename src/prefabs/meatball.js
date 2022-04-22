// Class that handles meatball movement and stats
class Meatball extends Phaser.GameObjects.Sprite {

    constructor(scene, posX, posY, texture){
        super(scene, posX, posY, texture);
        scene.add.existing(this);
    }

    update() {
        this.y += meatballSpeed;
        
        if(this.y > game.config.height + this.height) {
            this.y = -this.height;
            this.x = Math.random() * game.config.width;
        }
    }

}