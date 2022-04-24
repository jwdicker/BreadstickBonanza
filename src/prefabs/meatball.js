// Class that handles meatball movement and stats
class Meatball extends Phaser.Physics.Arcade.Sprite {

    constructor(scene){
        // Physics sprite setup
        super(scene, Math.random() * game.config.width, -UIDistance, "meatball");
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setVelocityY(meatballSpeed);
        this.setImmovable(true);

        // Whether or not this meatball has summoned another meatball
        this.summonedAlly = false;
    }

    update() {
        // Summons one ally once it's below a certain point such that they're evenly spaced
        if(!this.summonedAlly && this.y > (game.config.height / this.scene.maxMeatballs)) {
            this.summonedAlly = true;
            this.scene.summonMeatball();
        }

        // Kills itself once it is no longer useful
        if(this.y > game.config.height + this.height) {
            this.scene.meatballs.remove(this, true, true);
        }
    }
}