//Creative Tilt
// Our game implements a rudimentary velocity as 
// its main mechanic.
// In order to do this,we had to make the world 
// move instead of the player. (move objects up) 
// The matter physics collision has a few quirks, 
// one was that the player, upon collision with a
// platform would result in the player clipping 
// into said platform. 
// This was fixed by halting the movement of 
// everything but the player upon collision.
// We also had to deal with scene pausing and time 
// events.
// The fact that we used matterphysics was going 
// beyond the class examples. 
// We learned much about how groups, bodies, and
// collision categories COULD work, which should
// prove useful for the next game. 
//

let config = {
    type: Phaser.CANVAS,
     width: 900,
    height: 900,
  scene: [Menu,Play,Pause,DeathFall,Instruction],
  physics: {
      default: 'matter',
      matter: {
            //gravity: {x: 0, y: 0},
            //debug: true,

            enableSleeping: true,
            setBounds: {
                left: true,
                right: true,
                up: false,
                down: false,
               
          }
      },
    },
    autoCenter: Phaser.Scale.Center,
  }
  let game = new Phaser.Game(config);
  //let keyF,keyR,keyLEFT,keyRIGHT;
  let borderUISize = game.config.height / 15;
  let borderPadding = borderUISize /3 ;
  let keyDOWN,keyUP,keyLEFT,keyRIGHT,keyESC,keyESC2;
  let player;
  