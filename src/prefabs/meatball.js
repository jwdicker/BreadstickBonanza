class Meatball extends Phaser.GameObjects.Sprite {

    constructor(scene, posX, posY, texture){
        super(scene, posX, posY, texture);
        scene.add.existing(this);
        this.foo = true;
    }

    update() {
        this.y += meatballSpeed;
        
        if(this.y > game.config.height + this.height) {
            this.y = -this.height;
            this.x = Math.random() * game.config.width;
        }
    }

}