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
    this.fog_sprite1.move_step(100,100,4000);


    this.input.on('pointerdown', function (pointer) {

      this.fog_sprite1.move_direction(pointer.x,pointer.y,100,3000);

    }, this);

    /*
    var particles = this.add.particles('smoke');
    this.destX=x_mid+400;

    this.emitter=particles.createEmitter({
      speed: 100,
      scale:{start: 1, end:0},
      blendMode:'ADD'
    });

    const image = this.add.image(x_mid, y_mid, 'smoke');

    this.emitter.startFollow(image);


     this.tween = this.tweens.add({
      targets: image,
      duration: 30000,
      repeat: 10,
      ease: 'Sine.easeInOut',

      x: { value: this.destX, duration:3000,ease:'Power2'},

    });*/



    /*this.add.image(400, 300, 'smoke');


    const label = this.add.text(x_mid, y_mid, 'I am Fog', {
      font: '20px Arial',
      color: 'white',
      stroke: 'black',
      strokeThickness: 6
    });*/
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






  listener(pointer){
    var image = this.add.image(pointer.x, pointer.y, 'logo');
    //this.fog_sprite1.move_direction(pointer.x,pointer.y,100,3000);
  }



  render(){
    // game.debug.text(emitter.total, 32, 32);
  }
}
