class DeathFall extends Phaser.Scene {
    preload(){
        this.load.image('menuButton', 'assets/buttons/menuButton.png');
    }
    constructor(){
       super("DeathFallScreen");
    }

    create(){
        this.exit = false;
        // KB input
        keyESC2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        // "Paused" text
        let PauseStyle = {
            fontFamily: 'KarmaticArcade',
            fontSize: "80px",
            align: 'center',
        }
        this.pauseText = this.add.text(game.canvas.width/2, game.canvas.height/5, "GAME OVER", PauseStyle).setOrigin(0.5);
        // buttons
        this.menuButton = this.add.image(game.canvas.width/2, game.canvas.height/1.33, 'menuButton').setScale(1.5);
        this.menuButton.setInteractive();
    }

    update(){
        this.menuButton.on("pointerdown", () => {this.exit = true;});
        if (Phaser.Input.Keyboard.JustDown(keyESC2) || this.exit){
            // this.scene.stop()
            this.scene.resume('playScene', {exitTrigger: true});
            //this.scene.switch('playScene')
            this.exit = false;
            this.scene.stop();
            //this.scene.launch('playScene');
            //this.scene.stop();
            
        }
    }

}