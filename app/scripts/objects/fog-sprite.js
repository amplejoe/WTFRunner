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
  constructor(scene, x, y,speed,lifespan) {
    super(scene, x, y, 'smoke-puff');

    //angle in which the emitter emitts particles
    var emmiterAngleMax=45;
    var emmiterAngleMin=45;
    this.setOrigin(0.5);

    this.scene=scene;
    this.particles = scene.add.particles('smoke-puff');
    this.emitter=this.particles.createEmitter({
      speed: speed, //speed of the particles
      scale:{start: 1, end:0},
      blendMode:'ADD',
      lifespan: lifespan, //time till the particles vanish
      angle: {min:0+emmiterAngleMin, max:360-emmiterAngleMax} //angle in which the emitter emitts particles
    });


    //this.setPosition(x, y);
    this.setOrigin(0.5);
    this.emitter.startFollow(this);
    this.scene.physics.world.enable(this.emitter);
    //this.scene.physics.world.enable(this.particles);


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

  move_direction(x_pointgoal,y_pointgoal,move_duration){
    var dx=x_pointgoal-this.x;
    var dy=y_pointgoal-this.y;
    var length_pointer=Math.sqrt((dx*dx)+(dy*dy));



    var rotation=-Math.atan2((dy/length_pointer)-Math.sin(this.rotation),(dx/length_pointer)-Math.cos(this.rotation));


    //console.log(this.rotation);
    //console.log(rotation);
    var tween = this.scene.tweens.add({
      targets: this,
      ease: 'Power2',
      x: { value: this.x+dx, duration:move_duration,ease:'Power2'},
      y: { value: this.y+dy, duration:move_duration,ease:'Power2'},
      rotation: { value: this.rotation+rotation, duration:move_duration,ease:'Power2'},
    });

  }
  make_damage(player){
    var distance=Math.hypot(this.x-player.x, this.y-player.y);
    var damage=(this.emitter.lifespan/this.emitter.speed)*(1/(distance*distance));
    return damage;

  }

}
