class Play extends Phaser.Scene {
    

    constructor () {
        super("playScene");
        this.speed = 0;
        this.barFrame = 1;
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
        this.load.spritesheet('bar', 'assets/velbar.png', {frameWidth: 61,
        frameHeight: 243 
        });
        this.load.multiatlas('anims', 'assets/anims.json', 'assets');
    }
    
    create(){
        //this.globalclock = new Clock("playScene");
        //Global variables
        //this.globalclock = new Clock("playScene");
        this.bird;
        this.webst;
     //  this.wideweb = this.add.group();
        this.points = 0;
        var shapes = this.cache.json.get('shapes');
        //keyboard input
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        this.background = this.add.tileSprite(0, 0, 300, 256, 'bg').setOrigin(0,0).setScale(3,3.6);
        this.eventimer  = this.time.addEvent({delay:10000,callback: this.spawnbird,callbackScope:this});

        this.webber = this.time.addEvent({delay:1000,callback:this.spiderspawn,callbackScope:this});
        // walls that imitate movement with player
        this.WoodL = this.add.tileSprite(0, 0, 250, 1800, 'Left_Wall').setOrigin(0,0);
        this.WoodR = this.add.tileSprite(game.canvas.width, 0, 250, 1800, 'Right_Wall').setOrigin(0,0);
        this.matter.add.gameObject(this.WoodL).setFrictionAir(0.001).setStatic(true).setFriction(0.5);
        this.matter.add.gameObject(this.WoodR).setFrictionAir(0.001).setStatic(true).setFriction(0.5);
        
        // player
        this.player = this.matter.add.sprite(game.canvas.width/2, 0, 'slug', null, 'shapes');
        
        this.Warner = new velbar(this,0,0,'bar', 0).setOrigin(0,0);
        
        //platform
        this.plat = this.matter.add.image(200, 500, 'platA', null, {isStatic: true}).setScale(1,.75); 
        this.plat.setAngle(20)
        this.leaf = this.matter.add.sprite(400, 800, 'anims', 'leaf_slidon-0.png', {isStatic: true}).setScale(0.75,0.75);
        //this.plat = this.matter.add.image(400, 500, 'leaf', null, {isStatic: true});
        
        
        let ScoreStyle = {
            fontFamily: 'KarmaticArcade',
            fontSize: "30px",
            align: 'right',
        }
        this.score = this.add.text(game.canvas.width-200, 10, this.points, ScoreStyle);
        
        this.player.setCollisionGroup(30).setCollidesWith(17);
        this.player.body.sleepThreshold = -1;        
        this.exitTrigger = false;

        this.events.on('resume', (scene, data)=> {
            if (data){
                this.webst = null;
                this.scene.start('menuScene');
            }
        })
    }

    update(){
         
        //console.log(this.barFrame);
        if(Phaser.Input.Keyboard.JustDown(keyESC)){
            this.scene.launch('PauseScreen');
            this.scene.pause();
            //this.scene.destroy('PauseScreen');
           // this.matter.world.resume();
            
            
        }
        this.Warner.update();
        this.Warner.setFrame(this.Warner.thisFrame);
        //this.scene.destroy('PauseScreen');
        
        this.speed = this.player.body.velocity.y;
        
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
            var frameNames = this.anims.generateFrameNames('anims', {
                start: 1, end: 8, zeroPad: 1,
                prefix: 'leaf_slidon-', suffix: '.png'
            })
            this.anims.create({ key: 'hit', frames: frameNames, frameRate: 5, repeat:0 });
            this.leaf.anims.play('hit');
            if(this.player.x > this.leaf.x){
                this.leaf.x += -100;
            }
            else{
                this.leaf.x += 100;
            }
            
        }

        if(keyLEFT.isDown){
            this.player.setVelocityX(-6);
        }
        else if (keyRIGHT.isDown){
            this.player.setVelocityX(6);
        }
        //this.player.body.velocity.y
        
    if(this.eventimer.hasDispatched ) {
        //console.log(this.eventimer.hasDispatched);
        this.bird.update();
        if(this.matter.overlap(this.bird.body,this.player.body)){
            this.webst = null;
            this.scene.start('menuScene');
        }
    }

    if(this.webst){
        this.webst.update();
        if(this.matter.overlap(this.webst.body,this.player.body)){
            this.player.setVelocityY(5);
            if(!this.webst.breaking){
                var frameNames = this.anims.generateFrameNames('anims', {
                    start: 1, end: 8, zeroPad: 1,
                    prefix: 'break_sheet-', suffix: '.png'
                })
                this.anims.create({ key: 'break', frames: frameNames, frameRate: 8, repeat:0 });
                this.webst.anims.play('break');
                this.webst.breaking = true;
            }
        }
        if(this.webst.breaking && !this.webst.anims.isPlaying){
            this.webst.x = -200;
        }
        if(this.webst.y<-200){
            this.webst.destroy();
            this.spiderspawn();
        }

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
        this.bird = new Predator(this,game.canvas.width/2,50,'anims','bird_sheet-0.png',this.speed).setScale(1.75,1.75);
        this.plat.setAngle(Phaser.Math.Between(-15,15));
        this.bird.setIgnoreGravity(true);
        this.bird.body.sleepThreshold = -1; 
        this.bird.setDepth(0).setCollisionCategory(1).setCollidesWith(2);
        var frameNames = this.anims.generateFrameNames('anims', {
            start: 0, end: 3, zeroPad: 0,
            prefix: 'bird_sheet-', suffix: '.png'
        })
        this.anims.create({ key: 'fly', frames: frameNames, frameRate: 4, repeat:-1 });
        this.bird.play('fly');


    }

    spiderspawn(){
        this.lor = Phaser.Math.Between(1,2);
        if(this.lor == 1){
            this.webst = new spiderweb(this, 0,game.canvas.height, 'anims', 'break_sheet-0.png').setIgnoreGravity(true).setDepth(0);
        }
        else{
            this.webst = new spiderweb(this,game.canvas.width,game.canvas.height,'anims', 'break_sheet-0.png').setIgnoreGravity(true).setDepth(0);
            
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
        this.leaf = this.matter.add.sprite(Phaser.Math.Between(150, game.canvas.width-250), game.canvas.height + Phaser.Math.Between(0,200), 'anims', 'leaf_slidon-0.png', {isStatic: true});
        let x = Phaser.Math.Between(1,2);
        if(x=1){
            this.leaf.setScale(0.75,0.75);
        }else{
            this.leaf.setScale(-0.75,0.75);
        }
    }
}