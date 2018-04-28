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

    //var group=this.add.physicsGroup(Phaser.Physics.Arcade);
    this.emitter_array=[];

    this.emitter_group = this.physics.add.group({
      bounceX: 1,
      bounceY: 1,
      collideWorldBounds: true
    });
    this.physics.world.enable(this.emitter_group);


    for (var i=1;i<3+1;i++){
      //this.emitter_array[i]=this.add.existing(new FogSprite(this,200*i,200*i));
      this.emitter_array[i-1]=this.add.existing(new FogSprite(this,200*i,200*i));
      this.emitter_group.add(this.emitter_array[i-1]);
      //var fog= group.create();
    }

    //this.fog_sprite1=this.add.existing(new FogSprite(this,x_mid,y_mid));
    //this.fog_sprite1.move_step(100,100,4000);


    this.input.on('pointerdown', function (pointer) {
      for (var i=0;i<3;i++) {
        this.emitter_array[i].move_direction(pointer.x,pointer.y,3000,3000);
      }
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
