// Scene that displays tutorial
class Tutorial extends Phaser.Scene {

   constructor() {
       super("tutorial");
   }

   create() {
         keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
         keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
         keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);


      var tutConfig = {
         key: "tutAnimation",
         frames: this.anims.generateFrameNumbers("tutorial", {
         start: 0,
         end: 1,
         first: 0
         }),
         frameRate: 2,
         repeat: -1
      };

      this.anims.create(tutConfig);
      var tutorial = this.add.sprite(0, 0, "tutorial").play("tutAnimation");
      tutorial.setOrigin(0,0);
    }

   update() {
         console.log("Tutorial");
      
         if (Phaser.Input.Keyboard.JustDown(keyUp)||Phaser.Input.Keyboard.JustDown(keyLeft)||Phaser.Input.Keyboard.JustDown(keyRight)){
            this.scene.start("play");
         }
   }
}