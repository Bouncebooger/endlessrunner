let config = {
    type: Phaser.CANVAS,
     width: 900,
    height: 900,
  scene: [Menu,faPlay,Pause,DeathFall,Instruction],
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
  