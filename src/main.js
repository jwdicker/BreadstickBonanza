console.log("Foo");
console.log("Bar");

// Names:
// Alexis Adolpho
// Jacob Dickerman
// Grace Ho
// 
// Game: "Breadstick Bonanza" completed ?/?/22
//
// Sources: 
// https://phaser.discourse.group/t/center-game-on-my-website/5921/3
// https://github.com/nathanaltice/PaddleParkourP3
// https://github.com/nathanaltice/MovementStudies
//
// Creative Tilt:
// technical - 
// visual - 

const config = {
    type: Phaser.CANVAS,
    width: 659,
    height: 1177,
    zoom: 0.8,
    autoCenter: true,
    physics: {
        default: "arcade"
    },
    scene: [LoadScene, Menu, Tutorial, Play, End]
};

let game = new Phaser.Game(config);

// Configurations of stuff on the phone screen
const gameCanvasConfig = {
    width: 540,
    height: 960,
    offset: {
        x: 87,
        y: 111
    },
    getCenter: function(){
        return {
            x: this.width / 2 + this.offset.x,
            y: this.height / 2 + this.offset.y
        };
    }
}

// Input handling
let keyLeft, keyRight, keyUp, keyDown;

// Score
var scoreEnd = 0;

// Initialization Constants
const UIDistance = game.config.height / 30;
const bgMovementSpeed = 3;
const startingMeatballs = 1;
const meatballSpeed = 250;
const playerSpeed = 500;
const breadSpeed = -500;