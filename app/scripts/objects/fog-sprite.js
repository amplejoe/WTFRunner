//  Imports
import * as config from '@/config';

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
  constructor(scene, x, y,speed,lifespan,fogTimeout=config.FOG_TIMEOUT) {
    super(scene, x, y, 'smoke-puff');

  console.log("fog: " + fogTimeout);

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

    // console.log(this.emitter.lifespan.propertyValue);
    //this.setPosition(x, y);
    this.setOrigin(0.5);
    this.emitter.startFollow(this);
    this.scene.physics.world.enable(this.emitter);
    //this.scene.physics.world.enable(this.particles);

    this.fogTimeout = fogTimeout;

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
  // make_damage(player){
  //   var distance=Math.hypot(this.x-player.x, this.y-player.y);
  //   var damage = 0;
  //   if (distance <= 0) damage = 100;
  //   else
  //   {
  //     damage=(this.emitter.lifespan.propertyValue)*(1/(distance*distance+1));
  //   }
  //   if (damage > 100) damage = 100;
  //   // console.log("damage" + damage);
  //   // console.log("distance" + distance);
  //   // console.log("espeed" + this.emitter.speed);
  //   player.healthbar.hurt(damage);
  //   // return damage;
  //
  // }


  calc_points(points,dt=1){
    var pol_function=this.calc_poly(points);
    var x_values=[];
    var y_values=[];
    let max = points[0][0];
    for (let i=0;i<points.length;i++)
    {
      if (points[i][0] > max) max = points[i][0];
    }

    let ret = [];

    for (var i=0; i<max ;i=i+dt){

      ret[i] = {x:i,y:pol_function(i)}
      // x_values[i]=i;
      // y_values[i]=pol_function(i);
    }
    return ret;


  }

  calc_poly(points){
    var n = points.length - 1, p;

    p = function (i, j, x) {
      if (i === j) {
        return points[i][1];
      }

      return ((points[j][0] - x) * p(i, j - 1, x) +
        (x - points[i][0]) * p(i + 1, j, x)) /
        (points[j][0] - points[i][0]);
    };

    return function (x) {
      if (points.length === 0) {
        return 0;
      }
      return p(0, n, x);
    };
  }

  getParticleOverlap(character)
  {
    let particles = this.emitter.alive;
    let c_x_min = character.x - (character.width*config.PLAYER_SCALE/2);
    let c_x_max = character.x + (character.width*config.PLAYER_SCALE/2);
    let c_y_min = character.y - (character.height*config.PLAYER_SCALE/2);
    let c_y_max = character.y + (character.height*config.PLAYER_SCALE/2);
    // console.log(particles);
    let overlapping = [];
    for (let i=0;i<particles.length;i++)
    {
      let p_x = particles[i].x;
      let p_y = particles[i].y;
      if (p_x >= c_x_min && p_x <= c_x_max && p_y >= c_y_min && p_y <= c_y_max )
        overlapping.push(particles[i])
    }
    return overlapping;
  }

  damage(character,overlapping)
  {
    for (let i=0; i<overlapping.length; i++)
    {
      let life = overlapping[i].life;
      // console.log(overlapping[i]);1
      let curLifetime = overlapping[i].lifeCurrent;
      // console.log();
      let dmg = curLifetime/life * config.MAX_DMG;
      character.healthbar.hurt(dmg);
    }
  }

  deleteParticles(particles)
  {
    for (let i=0;i<particles.length;i++)
    {

      particles[i].lifeCurrent = 0;
      console.log(particles[i]);
    }
  }

  // calcPlayerHit(character)
  // {
  //   let overlappingParticles = this.getParticleOverlap(character);
  //   this.damage(character, overlappingParticles);
  //   return overlappingParticles.length > 0;
  // }


  update(t, dt)
  {
    this.fogTimeout -= dt;
    if (this.fogTimeout < 0)
    {
      let c = Math.max(0.2, (100000 - t) / 100000);
      this.fogTimeout = (config.FOG_TIMEOUT + config.FOG_TIMEOUT * (Math.random() - 0.5)) * c;
      this.move_direction(
        this.scene.character.x + (Math.random() - 0.5) * 256,
        this.scene.character.y + (Math.random() - 0.5) * 256,
        this.fogTimeout + (Math.random() - 0.5) * this.fogTimeout);
    }
  }



}
