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
  
  
  
  
  create(/* data */) {
    
    this.initPlayer();
    this.initObject();
    this.initPowerUp();
    this.initWorld();
    
    this.bombPickedUp = false;
    this.powerUpPickedUp = false;
    this.cursors = this.input.keyboard.createCursorKeys(); 
    this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.keyEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    
  }

  /**
   *  Handles updates to game logic, physics and game objects.
   *
   *  @protected
   *  @param {number} t - Current internal clock time.
   *  @param {number} dt - Time elapsed since last update.
   */
  update() {
      
    this.updatePlayerPosition();
      
  }
  
  initPlayer(){
      
    this.player = this.physics.add.sprite(50, 50, 'logo', 4).setScale(0.4);
    this.player.setCollideWorldBounds(true);
    this.player.body.setGravityY(0);
      
  }
  
  initObject(){
    
    this.object = this.physics.add.sprite(10, 400, 'logo', 4).setScale(0.25);
    this.object.setCollideWorldBounds(true);
    this.object.body.setGravity(0);
            
  }
  
  initPowerUp(){
      
    this.powerUp = this.physics.add.sprite(10, 250, 'logo', 4).setScale(0.25);
    this.powerUp.setCollideWorldBounds(true);
    this.powerUp.body.setGravity(0);
    
  }
  
  initWorld(){
      
    this.physics.world.setBounds(0, 0, this.cameras.main.width, this.cameras.main.height);  
      
  
  }
  
  checkCollision(){
      
      this.collidedWithBomb = this.physics.collide(this.player , this.object);
      this.collidedWithPowerUp = this.physics.collide(this.player, this.powerUp);
      
      if(this.collidedWithBomb){
          
        this.bombPickedUp = true;
        this.object.destroy();
          
      }
      
      if(this.collidedWithPowerUp){
          
        this.powerUpPickedUp = true;
        this.powerUp.destroy();
          
      }
      
  }
  
  updatePlayerPosition(){ 
    
    this.checkCollision();
    
    if(this.keySpace.isDown && (this.bombPickedUp === true)){
         
      
      this.bombPickedUp = false;
                
    }  
    
    if(this.keyEnter.isDown && (this.powerUpPickedUp === true)){
        
      this.player.rotation = 1;
      this.powerUpPickedUp = false;
        
    }
     
    if(this.cursors.left.isDown){ // WHEN LEFT IS PRESSED
         
      this.player.setVelocityX(-150);
      this.player.setVelocityY(0);
      
      if(this.cursors.up.isDown){ // .. and up is pressed
      
        this.player.setVelocityY(-150);
      
      }
      if(this.cursors.down.isDown){ // .. and down is pressed
          
        this.player.setVelocityY(150);
              
      }
      
    // ######################################
    
    }else if(this.cursors.right.isDown){ // WHEN RIGHT IS PRESSED
         
      this.player.setVelocityX(150);
      this.player.setVelocityY(0);
      
      if(this.cursors.up.isDown){
          
        this.player.setVelocityY(-150); 
          
      }
      
      if(this.cursors.down.isDown){
          
        this.player.setVelocityY(150);
      
      }
      
    // ######################################    
      
    }else if(this.cursors.up.isDown){ // WHEN UP IS PRESSED
         
      this.player.setVelocityY(-150);
      this.player.setVelocityX(0);
      
      if(this.cursors.left.isDown){
        
        this.player.setVelocityX(-150);              
          
      }
      
      if(this.cursors.right.isDown){
         
        this.player.setVelocityX(150);            
          
      }
    
    // ######################################            
                
    }else if(this.cursors.down.isDown){ // WHEN DOWN IS PRESSED 
         
      this.player.setVelocityY(150);
      this.player.setVelocityX(0);
      
      if(this.cursors.left.isDown){
        
        this.player.setVelocityX(-150);              
          
      }
      
      if(this.cursors.right.isDown){
         
        this.player.setVelocityX(150);            
          
      }
        
    }else{ 
              
      this.player.setVelocityX(0);
      this.player.setVelocityY(0);
         
    }
    
    
    
    
      
  }
  
}