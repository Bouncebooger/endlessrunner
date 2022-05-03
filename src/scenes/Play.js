class Play extends Phaser.Scene {
    

    constructor () {
        super("playScene");
        
    }
 
    preload(){
        //this.matter.world.setBounds(true,true,false,false);
        this.load.image('ab', 'assets/WoodSides.png');
        this.load.image('Right_Wall', 'assets/WoodSide_L.png');
        this.load.image('Left_Wall', 'assets/WoodSide_R.png');
        this.load.image('platA', 'assets/platformA.png');
        this.load.image('bg', 'assets/bg.png');
        this.load.image('slug', 'assets/Slug.png');
        this.load.image('leaf', 'assets/leaf.png');
    }
    
    create(){
        //this.globalclock = new Clock("playScene");
        //Global variables
        //this.globalclock = new Clock("playScene");
        this.bruh;
        this.webst;
        this.speed = 0;
     //  this.wideweb = this.add.group();
        this.points = 0;
        var shapes = this.cache.json.get('shapes');
        //keyboard input
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
       

        this.background = this.add.tileSprite(0, 0, 300, 256, 'bg').setOrigin(0,0).setScale(3,3.6);
        this.eventimer  =this.time.addEvent({delay:40000,callback: this.spawnbird,callbackScope:this});
        this.webber = this.time.addEvent({delay:1000,callback:this.spiderspawn,callbackScope:this});
        // walls that imitate movement with player
        this.WoodL = this.add.tileSprite(0, 0, 250, 1800, 'Left_Wall').setOrigin(0,0);
        this.WoodR = this.add.tileSprite(game.canvas.width, 0, 250, 1800, 'Right_Wall').setOrigin(0,0);
        this.matter.add.gameObject(this.WoodL).setFrictionAir(0.001).setStatic(true).setFriction(0.5);
        this.matter.add.gameObject(this.WoodR).setFrictionAir(0.001).setStatic(true).setFriction(0.5);
        
        // player
        this.player = this.matter.add.sprite(game.canvas.width/2, 0, 'slug', null, 'shapes');
        
        this.Warner = new velbar(this,0,0,'slug').setOrigin(0,0);
        
        //platform
        this.plat = this.matter.add.image(200, 500, 'platA', null, {isStatic: true}).setScale(1,.75); 

        this.leaf = this.matter.add.image(400, 500, 'leaf', null, {isStatic: true});
        //this.plat = this.matter.add.image(400, 500, 'leaf', null, {isStatic: true});
        this.plat.setAngle(20)
        this.score = this.add.text(game.canvas.width/2, game.canvas.height/4, this.points, null);
        this.player.setCollisionGroup(30).setCollidesWith(17);
        this.player.body.sleepThreshold = -1;
       
    }

    update(){
      
        this.speed = this.player.body.velocity.y;
        this.Warner.update();
        
        //this.P1.update();
        //console.log(this.player.body.velocity.y);
        
        this.points += this.player.body.velocity.y/100;
        

        
        
        
        
        
        if(!this.matter.overlap(this.plat.body, this.player.body)||this.plat.y<this.player.y){
            if (this.plat.y < -100){
                this.destroyPlatform();
            }
            else{
                if(this.player.body.velocity.y<=25){
                    this.plat.y -= this.player.body.velocity.y;
                    this.leaf.y -= this.player.body.velocity.y*.6;
                } else { 
                    this.plat.y -= 25;
                    this.leaf.y -= 25*.6;
                }
            }
            if (this.leaf.y < -100){
                this.destroyLeaf();
            }
            
            if(this.player.body.velocity.y >= 25){
                this.player.body.velocity.y = 25;
            }
            this.background.tilePositionY += this.player.body.velocity.y/4;
            this.WoodL.tilePositionY += this.player.body.velocity.y;
            this.WoodR.tilePositionY += this.player.body.velocity.y;
        }
        else{
            this.leaf.y += 1;
        }
        if(this.matter.overlap(this.leaf.body, this.player.body)){
            this.player.setVelocityY(-5);
            if(this.player.x < this.leaf.x)
                this.leaf.x += 80;
            else{
                this.leaf.x -= 80;
            }
        }
        
        if(keyLEFT.isDown){
            this.player.setVelocityX(-6);
        }
        else if (keyRIGHT.isDown){
            this.player.setVelocityX(6);
        }
        console.log(this.player.body.velocity.y)
    if(this.eventimer.hasDispatched ) {
        //console.log(this.eventimer.hasDispatched);
        this.bruh.update();
        if(this.matter.overlap(this.bruh.body,this.player.body)){
            this.webst = null;
            this.scene.start('menuScene');
        }
    }
    if(this.webst){
         this.webst.update();
         if(this.matter.overlap(this.webst.body,this.player.body)){
            this.player.setVelocityY(5);
        }
  
    if(this.webst.y<10){
        this.webst.destroy();
        this.spiderspawn();
    }

    }
        if(this.player.body.velocity.y >= 24 && this.matter.overlap(this.plat.body, this.player.body)){
            this.webst= null;
            this.scene.start('menuScene');
        }
        
        // console.log(this.player.body.velocity.y)
        
        if(this.player.y >= 400){
            this.player.y = 399;
        }
        

        if(this.points>this.score.text){
            this.score.text=Math.round(this.points);
        }
        
    }
    
    spawnbird(){
        console.log("amngus us");
        this.bruh = new Predator(this,game.canvas.width/2,50,'slug',null,this.speed);
        this.bruh.setIgnoreGravity(true);
        this.bruh.body.sleepThreshold = -1;
        this.bruh.setDepth(0).setCollisionCategory(1).setCollidesWith(2);


    }

    spiderspawn(){
        this.lor = Phaser.Math.Between(1,2);
        if(this.lor == 1){
        this.webst = new spiderweb(this,0,game.canvas.height,'leaf').setIgnoreGravity(true).setDepth(0);

        }
        else{
            this.webst = new spiderweb(this,game.canvas.width,game.canvas.height,'leaf',null).setIgnoreGravity(true).setDepth(0);
            
        }
        this.webst.setCollisionCategory(12).setCollidesWith(27);
        //this.webst.setStatic(true);
        //this.webst.body.sleepThreshold = -1;
        
      
    }


 
    destroyPlatform(){
        this.plat.destroy();
        this.plat = this.matter.add.sprite(Phaser.Math.Between(150, game.canvas.width-250), game.canvas.height + Phaser.Math.Between(0,20), 'platA', null, {isStatic: true}).setScale(1,.75);
        this.plat.setAngle(Phaser.Math.Between(-15,15));
    }
    destroyLeaf(){
        this.leaf.destroy();
        this.leaf = this.matter.add.sprite(Phaser.Math.Between(150, game.canvas.width-250), game.canvas.height + Phaser.Math.Between(0,200), 'leaf', null, {isStatic: true});
        this.leaf.setAngle(Phaser.Math.Between(-45,45));
    }
}