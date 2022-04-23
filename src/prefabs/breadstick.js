// class Breadstick extends Phaser.Physics.Arcade.Sprite {

//    constructor(scene, x, y, texture, frame) {
//       super(scene, x, y, texture, frame);
//       scene.add.existing(this);
//       this.moveSpeed = 2;
//    }

//    update() {
//       // movement
//       if(!this.isFiring) {
//          if(keyLeft.isDown) {
//             breadVelocity -= breadSpeed;
//          }
//          if(keyRight.isDown) {
//             breadVelocity += breadSpeed;
//          }      
//       }

//       // fire button
//       if(Phaser.Input.Keyboard.JustDown(keyUp)) {
//          this.isFiring = true;
//       }
//    }
// }