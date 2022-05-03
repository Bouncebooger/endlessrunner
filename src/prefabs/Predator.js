class Predator extends Phaser.Physics.Matter.Sprite { 
    constructor (scene,x,y,texture,frame,speedt){
        super(scene.matter.world,x,y,texture,frame,speedt);
        scene.add.existing(this);
        //this.chase ;
                
    }
    
    update(){
        this.chase = this.scene.speed;
        console.log("how");
        console.log(this.speedt);
        
        if(this.chase<8 && this.y <400){ 
        this.y +=  2;
        }
        if(this.chase>10 && this.y>50){
           this.y-= 5;
        }
      
    }
}