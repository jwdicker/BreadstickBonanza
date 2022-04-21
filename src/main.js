console.log("Foo");
console.log("Bar");

// Names:
// Alexis Adolpho
// Jacob Dickerman
// Grce Ho
// 
// Sources: 
// https://phaser.discourse.group/t/center-game-on-my-website/5921/3

const config = {
    type: Phaser.CANVAS,
    width: 540,
    height: 960,
    autoCenter: true,
    scene: [LoadScene]
};

let game = new Phaser.Game(config);