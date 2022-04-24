console.log("Foo");
console.log("Bar");

// Names:
// Alexis Adolpho
// Jacob Dickerman
// Grce Ho
// 
// Sources: 
// https://phaser.discourse.group/t/center-game-on-my-website/5921/3
// https://github.com/nathanaltice/PaddleParkourP3

const config = {
    type: Phaser.CANVAS,
    width: 540,
    height: 960,
    zoom: 0.9,
    autoCenter: true,
    physics: {
        default: "arcade"
    },
    scene: [LoadScene, Play]
};

let game = new Phaser.Game(config);

// Input handling
let keyLeft, keyRight, keyUp, keyDown;

// Initialization Constants
const UIDistance = game.config.height / 30;
const bgMovementSpeed = 3;
const startingMeatballs = 1;
const meatballSpeed = 250;
const playerSpeed = 500;
const breadSpeed = -500;