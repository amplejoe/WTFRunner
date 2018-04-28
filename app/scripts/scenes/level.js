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

    this.cursors = this.input.keyboard.createCursorKeys();
    this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.keyEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
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
  }

  setupMap()
  {
    this.sys.install('AnimatedTiles');

    // add tilemap to game
    // with json
    this.map = this.make.tilemap({key: 'level_1_map'});
    this.tileset = this.map.addTilesetImage('wtf_sheet','level_sprites');
    this.layer = this.map.createDynamicLayer('Kachelebene 1', this.tileset, 0, 0);

    // init animated tiles
    this.sys.animatedTiles.init(this.map);
    this.sys.animatedTiles.resume(0,0);
    this.sys.animatedTiles.updateAnimatedTiles();

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
    this.physics.add.sprite(this.character);
    this.physics.world.enable(this.character);
    this.character.body.setCollideWorldBounds(true);
    this.character.body.setGravity(0);

    this.anims.create({
      key: 'run',
      frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });
  }

  initPhysics(){
    this.physics.world.setBounds(0, 0, (this.map.widthInPixels + this.tileset.tileWidth) * config.ZOOM_FACTOR, (this.map.heightInPixels+ this.tileset.tileHeight) * config.ZOOM_FACTOR);
  }


  checkCollision(){
    this.collidedWithBomb = this.physics.collide(this.character , this.object);
    this.collidedWithPowerUp = this.physics.collide(this.character , this.powerUp);
    if(this.collidedWithBomb){
      this.bombPickedUp = true;
      this.object.destroy();
    }

    if(this.collidedWithPowerUp){
      this.powerUpPickedUp = true;
      this.powerUp.destroy();
    }
  }

  /**
     *  Handles updates to game logic, physics and game objects.
     *
     *  @protected
     *  @param {number} t - Current internal clock time.
     *  @param {number} dt - Time elapsed since last update.
     */
  update(t, dt) {
    // this.controls.update(dt);

    // player movement
    this.running = this.character.updatePlayerPosition(this.keySpace, this.keyEnter, this.cursors);

    if(this.running){
      this.physics.velocityFromAngle(this.character.body.rotation - 90, config.PLAYER_VELOCITY, this.character.body.velocity);
    }else{
      this.physics.velocityFromAngle(this.character.body.rotation - 90, 0, this.character.body.velocity);
    }

  }
}
