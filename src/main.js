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
// https://phaser.discourse.group/t/collider-callback-parameter-order/9817
// 
// SFX Credits:
// - Game theme: Cute music by Migfus20
// - End theme: Short melancholic theme on piano by EKVelika
// - Enemy Wave: Bell at Daitokuji Temple, Kyoto
// - Sprite footsteps: Turnin' Tail by Zepurple
//
// Creative Tilt:
// 
// technical - Perhaps the biggest technical tilt in this game is the 
// player's "breadstick defence," where the player can use their endless
// breadsticks to stave off the meatball madness. This was challenging on
// two fronts: the collision itself and the meatball spawning mechanics.
// Since the meatballs were part of a group, isolating the particular one 
// the breadstick hit required the use of parameters in the overlap callback
// function, in which the main challenge was finding the documentation.
// To make the meatballs evenly spaced, each meatball would recursively
// summon another once they passed a certain point on the screen which was
// dependant on the number of meatballs in play. However, to ensure this
// still occurred after a meatball was hit, rather than just destroying a meatball
// when it's hit, it just nulls its hitbox and zeros its alpha value.
// In effect, the meatball is still there, just as a ghost.
// 
// visual - We interpreted 'endless runner' literally at first, 
// by using 'olive garden endless breadsticks' as the starting point. 
// That idea was expanded to have the player use the breadsticks 
// as endless ammo to defeat enemies. We stuck with the faux italian 
// restaurant theme and had the player be a chef and the enemies be 
// meatballs. Also, we named a number of things using alliteration 
// (breadstick bonanza, meatball madness).
//
// sounds - We used "jsfxr - 8 bit sound" to create the sound effects for
// shooting the bread and meatball collision with the bread. As for the other 
// music files, we used "Freesound" to find our sound effects for other parts of our game, 
// such as the background theme, enemy waves, sprite footsteps, sprite death, and end theme. 
// We clipped and edited the pitch, tempo, speed, and bass for all music files to make them 
// unique for our game.

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
let scoreEnd = 0;

// Initialization Constants
const UIDistance = gameCanvasConfig.height / 30;
const bgMovementSpeed = 3;
const startingMeatballs = 1;
const meatballSpeed = 400;
const startingMeatSpeedMultiplier = 1.0;
const playerSpeed = 500;
const breadSpeed = -500;
const meatballRadius = 30;