//  Imports
import * as config from '@/config';

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

    this.setScale(config.ZOOM_FACTOR);

    this.recievedBomb = false;

    //this.body.setCollideWorldBounds(true);

    //  Add this game object to the owner scene.
    scene.children.add(this);

  }

  recieveBomb(){

      this.recievedBomb = true;

  }

  updatePlayerPosition(keySpace, keyEnter, cursors){

    var running = false;

    if(keySpace.isDown && (this.bombPickedUp === true)){

      this.setCircle(150);
      this.bombPickedUp = false;

    }

    if(keyEnter.isDown && (this.powerUpPickedUp === true)){

      this.rotation = 1;
      this.powerUpPickedUp = false;

    }

    if(cursors.left.isDown){ // WHEN LEFT IS PRESSED

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

      if(this.playing === false){
        this.playing = this.anims.play('run', true);
        this.playing = true;
      }

    // ######################################

    }else if(cursors.down.isDown){ // WHEN DOWN IS PRESSED


    }else{

      this.anims.stop('run', true);
      this.playing = false;
      this.body.setVelocityX(0);
      this.body.setVelocityY(0);

      running = false;

    }



   return running;

  }

}
