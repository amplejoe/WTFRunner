//  Imports
import * as config from '@/config';
import Player from '@/objects/player';


export default class Level extends Phaser.Scene {
  /**
     *  My custom scene.
     *
     *  @extends Phaser.Scene
     */
  constructor() {
    super({key: 'Level'});
  }

  preload()
  {
    // animated tiles plugin
    this.load.plugin('AnimatedTiles', 'animtiles/AnimatedTiles.js');
  }

  /**
     *  Responsible for setting up game objects on the screen.
     *
     *  @protected
     *  @param {object} [data={}] - Initialization parameters.
     */
  create(/* data */) {


    this.setupMap();
    this.initPlayer();
    this.initPhysics();
    this.setupCameras();
    this.setupControls();

    if (config.DEBUG) this.setupDebug();

  }

  setupControls()
  {
    // var cursors = this.input.keyboard.createCursorKeys();
    // var controlConfig = {
    //   camera: this.cameras.main,
    //   left: cursors.left,
    //   right: cursors.right,
    //   up: cursors.up,
    //   down: cursors.down,
    //   speed: 0.5
    // };
    // this.controls = new Phaser.Cameras.Controls.Fixed(controlConfig);

  }

  setupDebug()
  {
    var help = this.add.text(16, 16, 'Arrows to move', {
      fontSize: '18px',
      padding: { x: 10, y: 5 },
      backgroundColor: '#000000',
      fill: '#ffffff'
    });
    help.setScrollFactor(0);

    this.debugGraphics = this.add.graphics();
    this.drawDebug();

    this.input.keyboard.on('keydown_A', (event) => {
      this.character.healthbar.hurt(5);
    });

    this.input.keyboard.on('keydown_S', (event) => {
      this.character.healthbar.heal(5);
    });
  }

  setupMap()
  {
    this.sys.install('AnimatedTiles');

    // add tilemap to game
    // with json
    this.map = this.make.tilemap({key: 'level_1_map'});
    this.tileset = this.map.addTilesetImage('wtf_sheet','level_sprites');
    this.layer = this.map.createDynamicLayer('start', this.tileset, 0, 0);

    // init animated tiles
    // this.sys.animatedTiles.init(this.map);
    // this.sys.animatedTiles.resume(0,0);
    // this.sys.animatedTiles.updateAnimatedTiles();

    this.layer.setScale(config.ZOOM_FACTOR);
    // console.log(tileset);
    // console.log(this.map.widthInPixels);
    // console.log(this.map.widthInPixels * config.ZOOM_FACTOR);
  }

  setupCameras()
  {
    this.cameras.main.setBounds(0, 0, this.map.widthInPixels * config.ZOOM_FACTOR, this.map.heightInPixels * config.ZOOM_FACTOR);
    // this.cameras.main.setZoom(zoomFactor);
    this.cameras.main.startFollow(this.character);
  }

  initPlayer(){

    this.character = this.add.existing(new Player(this, 100 , 100));

  }

  initPhysics(){
    //  this.tileset.tileWidth, this.tileset.tileHeight
    this.physics.world.setBounds(0, 0, this.map.widthInPixels * config.ZOOM_FACTOR, this.map.heightInPixels * config.ZOOM_FACTOR);
    this.layer.setCollisionByProperty({ collides: true });

    //  This isn't totally accurate, but it'll do for now
    // this.map.setCollisionBetween(54, 83);
    // this.map.setCollisionbyExlusion(56);
    this.physics.add.collider(this.character, this.layer);
  }

  drawDebug ()
  {
    this.debugGraphics.clear();

    // Pass in null for any of the style options to disable drawing that component
    this.map.renderDebug(this.debugGraphics, {
      tileColor: null, // Non-colliding tiles
      collidingTileColor: new Phaser.Display.Color(243, 134, 48, 200), // Colliding tiles
      faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Colliding face edges
    });

    // helpText.setText(getHelpMessage());
  }


  // checkCollision(){
  //   this.collidedWithBomb = this.physics.collide(this.character , this.object);
  //   this.collidedWithPowerUp = this.physics.collide(this.character , this.powerUp);
  //   if(this.collidedWithBomb){
  //     this.bombPickedUp = true;
  //     this.object.destroy();
  //   }
  //
  //   if(this.collidedWithPowerUp){
  //     this.powerUpPickedUp = true;
  //     this.powerUp.destroy();
  //   }
  // }

  /**
     *  Handles updates to game logic, physics and game objects.
     *
     *  @protected
     *  @param {number} t - Current internal clock time.
     *  @param {number} dt - Time elapsed since last update.
     */
  update(t, dt) {
    // this.controls.update(dt);
    this.character.update();

  }
}
