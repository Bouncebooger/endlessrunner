class Menu extends Phaser.Scene {
   preload(){
      this.load.spritesheet( 'button', 'assets/buttons/button_sprite_sheet.png', {
         frameWidth: 193,
         frameHeight: 71
         });
      this.load.image('bg', 'assets/bg.png');
   }
   constructor() {
      super("menuScene");
   }
   
   create(){
      // background
      this.background = this.add.tileSprite(0, 0, 300, 256, 'bg').setOrigin(0,0).setScale(3,3.5);
      
      // button
      this.button = this.add.image(game.canvas.width/2, game.canvas.height/2, 'button', 1);
      this.button.setInteractive();
      
      // title
      const title = this.add.text(game.canvas.width/2, game.canvas.height/4, "Slug Fall").setOrigin(0.5,0);
      title.setFontSize(100);
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
         stroke: '#000000',
         strokeThickness: 5,
         fixedWidth: 0
      }
      // setting the center of text
      let centerX = game.config.width/2;
      let centerY = game.config.height/2;
      let textSpacer = 48;

      // game instructions 
      this.add.text(centerX, centerY + 2 * textSpacer, 'Move with the Arrow Keys (←)(→)', textConfig).setOrigin(0.5);
      this.add.text(centerX, centerY + 3 * textSpacer, 'Press (Q) to Break Through Webs', textConfig).setOrigin(0.5);
      // Goal
      textConfig.color = '#FFFF66';
      this.add.text(centerX, centerY + 4 * textSpacer, '>> Avoid the Bird <<', textConfig).setOrigin(0.5);
      // credits line
      textConfig.color = '#5F9EA0';
      textConfig.fontSize= '14px';
      this.add.text(centerX, centerY + 7 * textSpacer, 'Game by Skyler Haataja, Marlene Lopez, and Daniel Wild', textConfig).setOrigin(0.5);


      
   }
   update(){
      if(this.start == true){
         this.scene.start('playScene');
         this.start = false;
      }
      this.background.tilePositionY += .2;
      this.button.on("pointerover", () => {
         this.button = this.add.image(game.canvas.width/2, game.canvas.height/2, 'button', 2);
      });

      this.button.on("pointerout", () => {
         this.button = this.add.image(game.canvas.width/2, game.canvas.height/2, 'button', 1);
      });

      this.button.on("pointerdown", () => {
         this.button = this.add.image(game.canvas.width/2, game.canvas.height/2, 'button', 0);
         this.start = true;
      });
      
      
   }

}
