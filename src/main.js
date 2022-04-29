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
// https://github.com/rndmcnlly/DDDDDD
//
// Creative Tilt:
// technical - 
// visual - We interpreted 'endless runner' literally at first, 
// by using 'olive garden endless breadsticks' as the starting point. 
// That idea was expanded to have the player use the breadsticks 
// as endless ammo to defeat enemies. We stuck with the faux italian 
// restaurant theme and had the player be a chef and the enemies be 
// meatballs. Also, we named a number of things using alliteration 
// (breadstick bonanza, meatball madness).

const config = {
    type: Phaser.CANVAS,
    width: 659,
    height: 1177,
    zoom: 0.8,
    autoCenter: true,
    physics: {
        default: "arcade",
        arcade: {
            debug: true
        }
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
    getCenter: function () {
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
const meatballSpeed = 400;
const startingMeatSpeedMultiplier = 1.0;
const playerSpeed = 500;
const breadSpeed = -500;
const meatballRadius = 30;