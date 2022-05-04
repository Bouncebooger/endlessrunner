class Menu extends Phaser.Scene {
   preload(){
      this.load.image('bg', 'assets/bg.png');
      this.load.audio('sfx_bird','assets/bird.wav');
      this.load.audio('sfx_bybird','assets/deathbybird.wav');
      this.load.audio('sfx_thud','assets/landingthud.wav');
      this.load.audio('sfx_splat','assets/splat02.wav');
      this.load.audio('sfx_leaf','assets/leafjump.wav');
      this.load.audio('slugfallost','assets/SlugFallOST.wav');      
      this.load.image('playButton', 'assets/buttons/playButton.png');
      this.load.image('howToButton', 'assets/buttons/howButton.png');
      this.load.image('backPlate', 'assets/backPlate.png');
   }
   constructor() {
      super("menuScene");
   }
   
   create(){
      // background
      this.background = this.add.tileSprite(0, 0, 300, 256, 'bg').setOrigin(0,0).setScale(3,3.6);
      
      // button
      this.button = this.add.image(game.canvas.width/2, game.canvas.height/1.9, 'playButton').setScale(1.5);
      this.button.setInteractive();
      this.howButton = this.add.image(game.canvas.width/2, game.canvas.height/1.9 + this.button.height*2, 'howToButton').setScale(1.5);
      this.howButton.setInteractive();
      this.add.image(game.canvas.width/2, game.canvas.height/3.5, 'backPlate')
      // title
      this.add.text(game.canvas.width/2, game.canvas.height/5.5, "Slug", {
         fontFamily: 'KarmaticArcade',
         fontSize: '100px',
         }).setOrigin(0.5,0);
      this.add.text(game.canvas.width/2, game.canvas.height/3.3, "Fall", {
         fontFamily: 'KarmaticArcade',
         fontSize: '80px',
         }).setOrigin(0.5,0);
      //this.add.rectangle()
      this.start = false;
      
      
      // other text on screen
      //
      // text configuration
      let textConfig = {
         fontFamily: 'Courier',
         fontSize: '28px',
         color: '#FF7F50',
         align: 'center',
         padding: {
             top: 5,
             bototm: 5,
         },
         stroke: '#9F730B',
         strokeThickness: 3,
         fixedWidth: 0
      }
      // setting the center of text
      let centerX = game.config.width/2;
      let centerY = game.config.height/2;
      let textSpacer = 48;

      // credits line
      textConfig.color = '#FFEBAD';
      textConfig.fontSize= '25px';
      this.add.text(centerX, centerY + 7 * textSpacer, 'Game by Skyler Haataja, Marlene Lopez, and Daniel Wild', textConfig).setOrigin(0.5);
   }
   update(){
      if(this.start == true){
         this.scene.start('playScene');
         this.start = false;
      }
      if(this.howStart == true){
         this.scene.start('instructionScene');
         this.howStart = false;
      }
      this.background.tilePositionY += .2;
      this.button.on("pointerdown", () => {
         this.start = true;
      });

      this.howButton.on("pointerdown", () => {
         this.howStart = true;
      });
      
      
   }

}
