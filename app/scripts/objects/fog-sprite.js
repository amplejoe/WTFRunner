export default class FogSprite extends Phaser.GameObjects.Sprite {
  /**
   *  My custom sprite.
   *
   *  @constructor
   *  @class FogSprite
   *  @extends Phaser.GameObjects.Sprite
   *  @param {Phaser.Scene} scene - The scene that owns this sprite.
   *  @param {number} x - The horizontal coordinate relative to the scene viewport.
   *  @param {number} y - The vertical coordinate relative to the scene viewport.
   */
  constructor(scene, x, y) {
    super(scene, x, y, 'smoke-puff');

    //angle in which the emitter emitts particles
    var emmiterAngleMax=360-45;
    var emmiterAngleMin=45;

    this.scene=scene;
    this.particles = scene.add.particles('smoke-puff');
    this.emitter=this.particles.createEmitter({
      speed: 100, //speed of the particles
      scale:{start: 1, end:0},
      blendMode:'ADD',
      lifespan: 10000, //time till the particles vanish
      angle: {min:emmiterAngleMin, max:emmiterAngleMax} //angle in which the emitter emitts particles
    });


    //this.setPosition(x, y);
    this.setOrigin(0.5);
    this.emitter.startFollow(this);

    //  Add this game object to the owner scene.
    scene.children.add(this);
  }

  move_step(dx,dy,duration){
    //dx-> stepwidth in x direction
    //dy-> stepwidth in y direction
    // duration -> time till the emmiter moved to the goal
    var tween = this.scene.tweens.add({
      targets: this,
      ease: 'Sine.easeInOut',
      x: { value: this.x+dx, duration:duration,ease:'Power2'},
      y: { value: this.y+dy, duration:duration,ease:'Power2'}
    });
  }

  move_direction(x_pointgoal,y_pointgoal,stepwidth,duration){
    var dx=x_pointgoal-this.x;
    var dy=y_pointgoal-this.y;
    var length_pointer=Math.sqrt((x_pointgoal*x_pointgoal)+(y_pointgoal*y_pointgoal));
    var percentage=stepwidth/length_pointer;
    dx=dx*percentage;
    dy=dy*percentage;

    var tween = this.scene.tweens.add({
      targets: this,
      ease: 'Sine.easeInOut',
      x: { value: this.x+dx, duration:duration,ease:'Power2'},
      y: { value: this.y+dy, duration:duration,ease:'Power2'}
    });




  }
}
