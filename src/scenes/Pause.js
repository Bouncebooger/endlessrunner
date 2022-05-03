class Pause extends Phaser.Scene {
   constructor(){
       super("PauseScreen");
   }

   create(){
    keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
   }

   update(){
       console.log("beans");
       if (Phaser.Input.Keyboard.JustDown(keyESC)){
       // this.scene.stop()
           
           this.scene.resume('playScene');
           //this.scene.switch('playScene')
           //this.scene.stop();
           
           //this.scene.launch('playScene');
           //this.scene.stop();
           
       }
   }

}