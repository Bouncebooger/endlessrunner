/*# CMPM 120 Spring 2022
  Endless Runner Assignment

  ---------------------------------

  Collaborators: Skyler Haataja, Marlene Lopez, Daniel Wild
  Game Title: Slug Fall
  Date Completed: 04 May 2022

  Link to GitHub repository:        https://github.com/Bouncebooger/endlessrunner
  Playable link on GitHub pages:    https://bouncebooger.github.io/endlessrunner/

---------------------------------
*/
// Creative Tilt
// ----------------------------------------------------------------
// Does your game do something technically interesting?
// Are you particularly proud of a programming technique you implemented?
// Did you look beyond the class examples and learn how to do something new?
//
// Daniel Wild
// Our game implements a rudimentary velocity as its main mechanic.
// In order to do this,we had to make the world move instead of the player. (move objects up) 
// The matter physics collision has a few quirks, one was that the player, upon collision with a
// platform would result in the player clipping into said platform. 
// This was fixed by halting the movement of everything but the player upon collision.
// We also had to deal with scene pausing and time events.
// The fact that we used matterphysics was going beyond the class examples. 
// We learned much about how groups, bodies, and collision categories COULD work, which should
// prove useful for the next game. 
//
// Skyler Haataja
// As one of the main proigrammers on this assignment, I really felt the 
// weight of making sure the core mechanics were working before we could make much progress.
// We ended up hitting a wall with the clipping into the platforms and I struggled to 
// keep myself motivated during this. I think the main reason for our bug was 
// the lack of examples available online for using phaser with matter physics
// and our general lack of experience with it. Once we got the ball rolling and 
// did what we could to strengthen our game's fundamentals, I became proud of what we've 
// been working on. Scene management, adding a pause scene, and figuring out how to have 
// a runner where there was constant falling of a player provided interesting yet
// sometimes brutal challenges to overcome. I think that the end result shows off a 
// unique physics "endless runner" that is unlike ones I've played before.

//
// Does your game have a great visual style? Does it use music or art 
// that you're particularly proud of? Are you trying something new or 
// clever with the endless runner form?
// 
// Marlene Lopez:
// In the game, the player is a slug falling down a tree in trying to avoid instant death.
// The hovering menacing threat is the bird predator trying to catch a snack and the
// threat from below are the platforms. Depending on the velocity the slug is falling,
// it can splat on a platform by falling onto it at full speed. The visual effects used
// to portray these endings are two death animations where when the player and predator
// collide the player is sliced in half while when the players falls on to a platform
// at full velocity then the player ruptures into a blob. It was the first time I made
// game art so I had fun trying to animate these sprites and visually portray how
// these objects look while in active use by the player (e.g. breaking spider
// webs to indicate collision and slow down; leaves shaking from being bumped into).

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
  