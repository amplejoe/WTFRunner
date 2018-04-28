import FogSprite from '@/objects/fog-sprite';

export default class Fogtemp extends Phaser.Scene {
  /**
   *  My custom scene.
   *
   *  @extends Phaser.Scene
   */


  constructor() {
    super({key: 'Fogtemp'});


  }

  /**
   *  Responsible for setting up game objects on the screen.
   *
   *  @protected
   *  @param {object} [data={}] - Initialization parameters.
   */

  preload(){
    this.load.image('smoke', 'particles/smoke-puff.png');
  }


  create(/* data */) {


    const x_mid = this.cameras.main.width / 2;
    const y_mid = this.cameras.main.height / 2;

    this.fog_sprite1=this.add.existing(new FogSprite(this,x_mid,y_mid));
    //this.fog_sprite1.move_step(100,100,4000);


    this.input.on('pointerdown', function (pointer) {

      this.fog_sprite1.move_direction(pointer.x,pointer.y,3000,1000);

    }, this);






  }

  /**
   *  Handles updates to game logic, physics and game objects.
   *
   *  @protected
   *  @param {number} t - Current internal clock time.
   *  @param {number} dt - Time elapsed since last update.
   */



  update(/* t, dt */) {

  }






  render(){
    // game.debug.text(emitter.total, 32, 32);
  }
}
