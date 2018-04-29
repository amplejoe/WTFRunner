//  Imports
import * as config from '@/config';
import Player from '@/objects/player';
import Playeralt from '@/objects/playeralt';
import FogSprite from '@/objects/fog-sprite';


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

    this.layerP.setScale(config.ZOOM_FACTOR);
    this.layerG.setScale(config.ZOOM_FACTOR);
    // this.layerSpins.setScale(config.ZOOM_FACTOR);

    // init animated tiles (DONT SCALE AFTER!!)
    this.sys.animatedTiles.init(this.map);
    // resume(layerindex, mapindex)
    this.sys.animatedTiles.resume(0,0);
    this.sys.animatedTiles.updateAnimatedTiles();

    this.setupCameras();
    this.setupControls();

    this.fogImmunity = 0;
    this.fogSprites = [];
    this.createFogSprite(200,200,100,10000);

    if (config.DEBUG) this.setupDebug();

    this.scoreDisplay = this.add.text(16, 16, 'Score: 0', {
      fontSize: '32px',
      padding: { x: 10, y: 5 },
      // backgroundColor: '#000000',
      fill: '#ffffff'
    });
    this.scoreDisplay.setShadow(5, 5, 'rgba(0,0,0,0.8)', 15);
    this.scoreDisplay.setScrollFactor(0);
    this.score = 0;
    this.scoreCounter = config.SCORE_INCREMENT_MS;

  }

  createFogSprite(x, y, speed, lifespan) {
    var fog = new FogSprite(this, x, y, speed, lifespan);
    // fog.make_damage(this.character);
    this.fogSprites.push(fog);
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

    this.layerG = this.map.createDynamicLayer('ground', this.tileset, 0, 0);
    // this.layerSpins = this.map.createDynamicLayer('spins', this.tileset, 0, 0);
    this.layerP = this.map.createDynamicLayer('start', this.tileset, 0, 0);


    // old
    // this.cans = this.physics.add.group();
    // let can_can = this.map.createFromObjects('spins', 'can', 'powerUp', 5, true, false, this.cans); // step 2
    // let finalcan = this.cans.create(can_can[0]).setVelocity(0,0);

    // objects
    // map = this.add.tilemap('map');
    // var tiles = map.addTilesetImage('ground_1x1');
    // var layer = map.createStaticLayer('Tile Layer', tiles);
    // this.cans = this.physics.add.group();
    this.anims.create({
      key: 'spin_can',
      frames: this.anims.generateFrameNumbers('powerUp', { start: 0, end: 3 }),
      frameRate: 16,
      repeat: -1
    });
    
    this.anims.create({
      key: 'health_item',
      frames: this.anims.generateFrameNumbers('healthUp', { start: 0, end: 3 }),
    })

    // We convert all of the Tiled objects with an ID of 5 into sprites. They will get their width
    // & height from the Tiled tile object. Any custom properties on the tile object will also be
    // passed to the sprite creator (e.g. one of the tile object's has an alpha of 0.5).
    this.powerUpSprites = this.map.createFromObjects('spins', 5, { key: 'can' });


    for (let i=0;i<this.powerUpSprites.length;i++)
    {
      // enable physics before resizing
      this.physics.world.enable(this.powerUpSprites[i]);
      this.powerUpSprites[i].setScale(config.POWERUP_SCALE);

    }
    // this.setScale(config.PLAYER_SCALE);
    this.anims.play('spin_can', this.powerUpSprites);


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

    this.character = this.add.existing(new Player(this, 0 , 0));
    this.character.x = this.character.width*config.PLAYER_SCALE * 4;
    this.character.y = this.character.width*config.PLAYER_SCALE * 8;
    // console.log(this.character);

  }

  initPhysics(){
    //  this.tileset.tileWidth, this.tileset.tileHeight
    this.physics.world.setBounds(0, 0, this.map.widthInPixels * config.ZOOM_FACTOR, this.map.heightInPixels * config.ZOOM_FACTOR);
    this.layerP.setCollisionByProperty({ collides: true });

    //  This isn't totally accurate, but it'll do for now
    // this.map.setCollisionBetween(1, 999);
    // this.map.setCollisionbyExlusion(56);
    //[63,64,78,77]
    let colltiles = [1,2,3,4,16,17,18,19,33,34,48,49,91,92,93,94,106,107,108,109,121,122,123,124];
    this.map.setCollision(colltiles, true, this.layerP);
    this.physics.add.collider(this.character, this.layerP);
    //this.physics.collide(this.character, this.layerP);

    // powerups
    this.powerups = this.physics.add.group();
    for (let i=0;i<this.powerUpSprites.length;i++)
    {

      this.powerUpSprites[i].body.allowGravity = false;
      this.powerUpSprites[i].body.immovable = true;
      this.powerups.add(this.powerUpSprites[i]);
    }

    // console.log(this.powerups.children);
    // this.collidedWithBomb = this.physics.collide(this.character , this.object);
    // this.collidedWithPowerUp = this.physics.collide(this.character , this.powerups);

    // group.children.iterate(createGem, this);

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


  startGameover()
  {
    this.scene.start('Gameover', this.score);
  }

  checkPlayerCollisions(){
    // this.collidedWithBomb = this.physics.collide(this.character , this.object);
    // if(this.collidedWithBomb){
    //   this.bombPickedUp = true;
    //   this.object.destroy();
    // }

    this.collidedWithPowerUp = this.physics.collide(this.character , this.powerups);
    if(this.collidedWithPowerUp){
      console.log("collided with powerup");
      this.character.powerUpPickedUp = true;
      // this.character.spinning = true;
      // this.powerUp.destroy();
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
    this.character.update();

    // player collisions
    this.checkPlayerCollisions();

    // score
    this.scoreCounter -= dt;
    if (this.scoreCounter <= 0)
    {
      this.scoreCounter = config.SCORE_INCREMENT_MS;
      this.score++;
      this.scoreDisplay.setText('Score: ' + this.score);
    }

    // hit timout
    this.fogImmunity -= dt;
    let canBeHit = (this.fogImmunity <= 0);

    for (let i=0; i<this.fogSprites.length; i++) {
      this.fogSprites[i].update(t, dt);
      if (canBeHit)
      {
        let isHit = this.fogSprites[i].calcPlayerHit(this.character);
        if (isHit) this.fogImmunity = config.FOG_IMMUNITY_MS;
      }

    }

  }
}
