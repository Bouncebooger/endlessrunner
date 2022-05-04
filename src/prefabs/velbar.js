class velbar extends Phaser.GameObjects.Sprite {
  constructor (scene,x,y,texture,frame){
    super(scene,x,y,texture,frame);
    scene.add.existing(this);
    this.thisFrame = 0;
}

update(){
  switch(true){
    case (this.scene.player.body.velocity.y<=8):
      this.thisFrame = 0;
      break;
    case (this.scene.player.body.velocity.y<=14):
      this.thisFrame = 1;
      break;
    case (this.scene.player.body.velocity.y<=22):
      this.thisFrame = 2;
      break;
    case (this.scene.player.body.velocity.y<=25):
      this.thisFrame = 3;
      break;
    }  
  }
}