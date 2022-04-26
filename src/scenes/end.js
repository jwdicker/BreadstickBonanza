// End scene
class End extends Phaser.Scene {

   constructor() {
       super("end");
   }

   create() {
        keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.add.image(0,0, 'end').setOrigin(0,0);
    }

   update() {
        console.log("End");

        if (Phaser.Input.Keyboard.JustDown(keyUp)){
            this.scene.start("play");
        }
   }
}