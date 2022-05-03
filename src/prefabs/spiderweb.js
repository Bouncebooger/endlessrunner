class spiderweb extends Phaser.Physics.Matter.Sprite{
    constructor(scene,x,y,texture,frame){
        super(scene.matter.world,x,y,texture,frame);
        scene.add.existing(this);
        this.setCollidesWith(-1);
        //this.setCollidesActive()
        //this.setStatic(true);
        this.breaking = false;
    }

    update(){
        this.chase = this.scene.speed;
        //console.log("webs");
        //console.log(this.chase);
        this.y -= this.chase;
        
    }
     
}