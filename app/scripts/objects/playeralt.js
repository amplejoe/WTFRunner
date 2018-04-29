//  Imports
import * as config from '@/config';
import Healthbar from '@/objects/healthbar';

export default class Playeralt extends Phaser.GameObjects.Sprite {
  /**
   *  My custom sprite.
   *
   *  @constructor
   *  @class Playeralt
   *  @extends Phaser.GameObjects.Sprite
   *  @param {Phaser.Scene} scene - The scene that owns this sprite.
   *  @param {number} x - The horizontal coordinate relative to the scene viewport.
   *  @param {number} y - The vertical coordinate relative to the scene viewport.
   */
  constructor(scene, x, y) {
    super(scene, x, y, 'player');

    //console.log(scene.impact);
    scene.impact.world.enable(this);

    this.setMaxVelocity(300, 400).setFriction(800, 0);
    this.body.accelGround = 1200;
    this.body.accelAir = 600;
    this.body.jumpSpeed = 300;

    // this.body.setCollideWorldBounds(true);
    // this.body.setGravity(0);
    // this.body.setScale(config.ZOOM_FACTOR);

    this.setScale(config.ZOOM_FACTOR);

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

    //  Add this game object to the owner scene.
    scene.children.add(this);
    this.healthbar = new Healthbar(scene,scene.cameras.main.width - 70, 20, 40, 200);
    this.scene = scene;

    this.initControls();

    this.timer;

  }

  recieveBomb(){

    this.recievedBomb = true;

  }

  recievePowerUp(){

    this.recievedPowerUp = true;

  }

  stopSpinning(){

    this.anims.stop('spin',true);
    this.anims.play('run', true);
    this.spinning = false;

  }

  getSpinningStatus(){

    return this.spinning;

  }


  updatePlayerPosition(keySpace, keyEnter, cursors){

    var running = false;

    if(keySpace.isDown && this.recievedBomb){  // WHEN SPACE IS PRESSED FOR BOMB TO USE

      this.recievedBomb = false;

    }else if(keyEnter.isDown && this.recievedPowerUp){ // WHEN ENTER IS PRESSED FOR POWERUP TO USE

      this.anims.stop('run', true);
      this.anims.play('spin', true);
      this.spinning = true;
      this.recievedPowerUp = false;
      this.timer = this.scene.time.addEvent({ delay: 3000, callback: this.stopSpinning, callbackScope: this, repeat: false });

    }else if(cursors.left.isDown){ // WHEN LEFT IS PRESSED

      this.body.rotation = this.body.rotation - 5 ;

      if(cursors.up.isDown){

        running = true;

      }
    // ######################################

    }else if(cursors.right.isDown){ // WHEN RIGHT IS PRESSED

      this.body.rotation = this.body.rotation + 5 ;

      if(cursors.up.isDown){

        running = true;

      }
    // ######################################

    }else if(cursors.up.isDown){ // WHEN UP IS PRESSED

      running = true;

      if(running && !this.spinning){
        this.anims.play('run', true);
      }

    // ######################################

    }else if(cursors.down.isDown){ // WHEN DOWN IS PRESSED


    }else{

      if(!this.spinning){
        this.anims.stop('run', true);
      }

      this.body.setVelocityX(0);
      this.body.setVelocityY(0);

      running = false;

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
    this.running = this.updatePlayerPosition(this.keySpace, this.keyEnter, this.cursors);

    if(this.running){
      this.scene.physics.velocityFromAngle(this.body.rotation - 90, config.PLAYER_VELOCITY, this.body.velocity);
    }else{
      this.scene.physics.velocityFromAngle(this.body.rotation - 90, 0, this.body.velocity);
    }

  }
}
