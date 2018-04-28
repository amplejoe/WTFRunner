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


    this.scene=scene;
    this.particles = scene.add.particles('smoke-puff');
    this.emitter=this.particles.createEmitter({
      speed: 100,
      scale:{start: 1, end:0},
      blendMode:'ADD'
    });


    //this.setPosition(x, y);
    this.setOrigin(0.5);
    this.emitter.startFollow(this);

    //  Add this game object to the owner scene.
    scene.children.add(this);
  }

  move_step(dx,dy,duration){

    var tween = this.scene.tweens.add({
      targets: this,
      ease: 'Sine.easeInOut',
      x: { value: this.x+dx, duration:duration,ease:'Power2'},
      y: { value: this.y+dy, duration:duration,ease:'Power2'}
    });


  }
}
