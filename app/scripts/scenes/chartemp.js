import Player from '@/objects/player';

export default class Chartemp extends Phaser.Scene {
  /**
   *  My custom scene.
   *
   *  @extends Phaser.Scene
   */
  constructor() {
    super({key: 'Chartemp'});
  }

  /**
   *  Responsible for setting up game objects on the screen.
   *
   *  @protected
   *  @param {object} [data={}] - Initialization parameters.
   */ 
  
   create(){
      
    this.initPlayer();
    this.initObject();
    this.initPowerUp();
    this.initWorld();
    this.initInput();
    
    this.bombPickedUp = false;
    this.powerUpPickedUp = false;
    
  }
  
  update(){
      

      this.running = this.character.updatePlayerPosition(this.keySpace, this.keyEnter, this.cursors);

      
      if(this.running[0]){
          
          this.physics.velocityFromAngle(this.character.body.rotation - 90, 250, this.character.body.velocity);
               
      }else if(this.running[1]){
          
          this.physics.velocityFromAngle(this.character.body.rotation - 90, 250, this.character.body.velocity);
          
      }else{
          
          this.physics.velocityFromAngle(this.character.body.rotation - 90, 0, this.character.body.velocity);
          
      }
      
     
      this.checkCollision();
      
  }
  
  initPlayer(){
      
    this.character = this.add.existing(new Player(this, 300 , 300));
    this.physics.add.sprite(this.character);
    this.physics.world.enable(this.character);
    this.character.body.setCollideWorldBounds(true);
    this.character.body.setGravity(0);
    
    this.anims.create({
    key: 'run',
    frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1
    });
    
    this.anims.create({
    key: 'tornado',
    frames: this.anims.generateFrameNumbers('tornado', { start: 0, end: 3}),
    frameRate: 10,
    repeat: -1
    });
    
  }
  
  initObject(){
    
    this.object = this.physics.add.sprite(100, 400, 'logo', 4).setScale(0.25);
    this.object.setCollideWorldBounds(true);
    this.object.body.setGravity(0);
    
  }
  
  initPowerUp(){
      
    this.powerUp = this.physics.add.sprite(100, 250, 'powerUp', 4).setScale(0.5);
    this.powerUp.setCollideWorldBounds(true);
    this.powerUp.body.setGravity(0);
    
    this.powerUp1 = this.physics.add.sprite(150, 250, 'powerUp', 4).setScale(0.5);
    this.powerUp1.setCollideWorldBounds(true);
    this.powerUp1.body.setGravity(0);
    
    this.powerUp2 = this.physics.add.sprite(200, 250, 'powerUp', 4).setScale(0.5);
    this.powerUp2.setCollideWorldBounds(true);
    this.powerUp2.body.setGravity(0);
    
    this.anims.create({
    key: 'powerUpItem',
    frames: this.anims.generateFrameNumbers('powerUp', { start: 0, end: 3 }),
    frameRate: 7,
    repeat: -1
    }); 
    
    this.powerUp.anims.play('powerUpItem',true);
    
  }
 
  initWorld(){
      
    this.physics.world.setBounds(0, 0, this.cameras.main.width, this.cameras.main.height);  
      
  }
  
  initInput(){
      
    this.cursors = this.input.keyboard.createCursorKeys(); 
    this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.keyEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
      
  }
  
  checkCollision(){
      
      this.collidedWithBomb = this.physics.collide(this.character , this.object);
      this.collidedWithPowerUp = this.physics.collide(this.character , this.powerUp);
      this.collidedWithPowerUp1 = this.physics.collide(this.character , this.powerUp1);
      this.collidedWithPowerUp2 = this.physics.collide(this.character , this.powerUp2);
      
      if(this.collidedWithBomb){
      
        this.character.recieveBomb();
        this.object.destroy();
          
      }
      
      if(this.collidedWithPowerUp){
          
        this.character.addPowerUp();
        this.powerUp.destroy();
          
      }
      
      if(this.collidedWithPowerUp1){
          
        this.character.addPowerUp();
        this.powerUp1.destroy();
          
      }
      
      if(this.collidedWithPowerUp2){
          
        this.character.addPowerUp();
        this.powerUp2.destroy();
          
      }
      
  }

        
}
