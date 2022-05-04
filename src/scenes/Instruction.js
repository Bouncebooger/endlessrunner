class Instruction extends Phaser.Scene {
    preload(){
        this.load.image('menuButton', 'assets/buttons/menuButton.png');
        this.load.image('bg', 'assets/bg.png');
        this.load.image('instructionSheet', 'assets/instructionSheet.png');
    }
    constructor(){
       super("instructionScene");
    }

    create(){
        
        this.background = this.add.tileSprite(0, 0, 300, 256, 'bg').setOrigin(0,0).setScale(3,3.6);
        this.exit = false;
        // KB input
        keyESC2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        // buttons
        this.menuButton = this.add.image(game.canvas.width/2, game.canvas.height-70, 'menuButton').setScale(1.5);
        this.menuButton.setInteractive();
        // instruction page
        this.add.image(game.canvas.width/2, game.canvas.height/2, 'instructionSheet').setScale(1.2);
    }

    update(){
        this.background.tilePositionY += .2;
        this.menuButton.on("pointerdown", () => {this.exit = true;});

        if (Phaser.Input.Keyboard.JustDown(keyESC2) || this.exit){
            this.scene.start('menuScene');
            this.scene.stop();
            
        }
    }

}