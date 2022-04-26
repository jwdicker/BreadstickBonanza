// End scene
class End extends Phaser.Scene {

   constructor() {
       super("end");
   }

   create() {
         this.add.image(0,0, 'phone').setOrigin(0,0);
         keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
         this.add.image(87,110, 'end').setOrigin(0,0);
    }

   update() {
        console.log("End");

        if (Phaser.Input.Keyboard.JustDown(keyUp)){
            this.scene.start("play");
        }
   }
}