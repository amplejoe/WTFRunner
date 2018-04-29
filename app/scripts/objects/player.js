//  Imports
import * as config from '@/config';
import Healthbar from '@/objects/healthbar';

export default class Player extends Phaser.GameObjects.Sprite {
  /**
   *  My custom sprite.
   *
   *  @constructor
   *  @class Player
   *  @extends Phaser.GameObjects.Sprite
   *  @param {Phaser.Scene} scene - The scene that owns this sprite.
   *  @param {number} x - The horizontal coordinate relative to the scene viewport.
   *  @param {number} y - The vertical coordinate relative to the scene viewport.
   */
  constructor(scene, x, y) {
    super(scene, x, y, 'player');


    scene.physics.world.enable(this);
    this.body.setCollideWorldBounds(true);
    this.body.setGravity(0);
    // this.body.setScale(config.ZOOM_FACTOR);

    this.setScale(config.PLAYER_SCALE);

    scene.anims.create({
      key: 'run',
      frames: scene.anims.generateFrameNumbers('player', { start: 0, end: 9 }),
      frameRate: 15,
      repeat: -1
    });

    scene.anims.create({
      key: 'spin',
      frames: scene.anims.generateFrameNumbers('player_spin', { start: 0, end: 8}),
      frameRate: 30,
      repeat: -1
    });




    this.recievedBomb = false;
    this.recievedPowerUp = false;
    this.spinning = false;
    this.turnedAround = false;
    this.powerUpBarChanged = false;
    this.amountOfPowerUps = 0;
    this.powerUps = [0,0,0];


    //  Add this game object to the owner scene.
    scene.children.add(this);
    this.healthbar = new Healthbar(scene,scene.cameras.main.width - 70, 20, 40, 200);
    this.scene = scene;

    this.initControls();

    this.timer;

  }

  getAmountOfPowerUps(){

    return this.amountOfPowerUps;

  }

  addPowerUp(){

    if(this.amountOfPowerUps < 3){
      this.amountOfPowerUps = this.amountOfPowerUps + 1;

      this.powerUps[this.amountOfPowerUps-1] = this.addPowerUpToBar(((this.amountOfPowerUps-1) * 14));



    }

  }

  addPowerUpToBar(offset){

    var powerUp = this.scene.physics.add.sprite((this.scene.cameras.main.width - 110) - offset, 40, 'powerUp', 4).setScale(0.3);
    powerUp.rotation = 0.3;
    powerUp.setScrollFactor(0);

    return powerUp;

  }

  removePowerUpFromBar(){


    this.powerUps[this.amountOfPowerUps-1].destroy();
    this.powerUps[this.amountOfPowerUps-1] = 0;
    this.amountOfPowerUps = this.amountOfPowerUps - 1;


  }

  recieveBomb(){

    this.recievedBomb = true;

  }

  stopSpinning(){

    this.anims.stop('spin',true);
    this.anims.play('run', true);
    this.spinning = false;

  }

  getSpinningStatus(){

     return this.spinning;

  }

  // remove powerUp on ENTER

  updatePlayerPosition(keySpace, keyEnter, cursors){

    var running = [false,false];


    if(keySpace.isDown && this.recievedBomb){  // WHEN SPACE IS PRESSED FOR BOMB TO USE

      this.recievedBomb = false;

    }else if(keyEnter.isDown && (this.amountOfPowerUps > 0) && (this.spinning === false)){ // WHEN ENTER IS PRESSED FOR POWERUP TO USE

      this.removePowerUpFromBar();

      this.anims.stop('run', true);
      this.anims.play('spin', true);
      this.spinning = true;
      this.timer = this.scene.time.addEvent({ delay: config.CAN_INVINCIBILITY, callback: this.stopSpinning, callbackScope: this, repeat: false });

    }else if(cursors.left.isDown){ // WHEN LEFT IS PRESSED

      this.body.rotation = this.body.rotation - 5 ;

      if(cursors.up.isDown){

          running[0] = true;
          running[1] = false;


      }

      if(cursors.down.isDown){

         running[1] = true;
         running[0] = false;


      }
    // ######################################

    }else if(cursors.right.isDown){ // WHEN RIGHT IS PRESSED

      this.body.rotation = this.body.rotation + 5 ;

       if(cursors.up.isDown){

         running[0] = true;
         running[1] = false;


      }
      if(cursors.down.isDown){

         running[1] = true;
         running[0] = false;


      }
    // ######################################

    }else if(cursors.up.isDown){ // WHEN UP IS PRESSED

      running[0] = true;

      if(this.turnedAround === true){

      this.body.rotation = this.body.rotation + 180;
      this.turnedAround = false;

      }

      if(!this.spinning){
        this.anims.play('run', true);
      }

    // ######################################

    }else if(cursors.down.isDown){ // WHEN DOWN IS PRESSED

      running[1] = true;

      if(this.turnedAround === false){

      this.body.rotation = this.body.rotation + 180;
      this.turnedAround = true;

      }

      if(!this.spinning){
        this.anims.play('run', true);
      }

    }else{

      if(!this.spinning){
        this.anims.stop('run', true);
      }

      this.body.setVelocityX(0);
      this.body.setVelocityY(0);

      running[0] = false;
      running[1] = false;

    }

    return running;

  }

  initControls()
  {
    this.cursors = this.scene.input.keyboard.createCursorKeys();
    this.keySpace = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.keyEnter = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

  }

  update()
  {

    // player movement
    var running = this.updatePlayerPosition(this.keySpace, this.keyEnter, this.cursors);

    if(running[0] === true){
      this.scene.physics.velocityFromAngle(this.body.rotation - 90, config.PLAYER_VELOCITY, this.body.velocity);
    }else if(running[1] === true){
      this.scene.physics.velocityFromAngle(this.body.rotation - 90, config.PLAYER_VELOCITY, this.body.velocity);
    }else{

      this.scene.physics.velocityFromAngle(this.body.rotation - 90, 0, this.body.velocity);

    }

  }
}
