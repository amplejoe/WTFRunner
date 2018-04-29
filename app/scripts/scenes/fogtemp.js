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


    // const x_mid = this.cameras.main.width / 2;
    // const y_mid = this.cameras.main.height / 2;

    //var group=this.add.physicsGroup(Phaser.Physics.Arcade);
    this.emitter_array=[];



    for (var i=0;i<3;i++){
      //this.emitter_array[i]=this.add.existing(new FogSprite(this,200*i,200*i));
      this.emitter_array[i]=this.add.existing(new FogSprite(this,200*(i+1),200*(i+1),100,10000));

      //var fog= group.create();
    }

    //this.fog_sprite1=this.add.existing(new FogSprite(this,x_mid,y_mid));
    //this.fog_sprite1.move_step(100,100,4000);


    this.input.on('pointerdown', function (pointer) {
      for (var i=0;i<3;i++) {
        this.emitter_array[i].move_direction(pointer.x,pointer.y,3000,3000);
      }
    }, this);

    // console.log(this.emitter_array[0].calc_points([[-2, 2], [-1, -0.5], [0, 0.5], [1.5, -1.5]],1));





  }

  /**
   *  Handles updates to game logic, physics and game objects.
   *
   *  @protected
   *  @param {number} t - Current internal clock time.
   *  @param {number} dt - Time elapsed since last update.
   */



  update(/* t, dt */) {
    //this.physics.arcade.collide(this.emitter_group);
  }







  render(){
    // game.debug.text(emitter.total, 32, 32);
  }
}
