//  Imports
import * as config from '@/config';
import Player from '@/objects/player';
// import Playeralt from '@/objects/playeralt';
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

    this.destroySound = this.sound.add('destroy');

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
    this.createFogSprite(0,0,100,10000);
    this.createFogSprite(this.map.widthInPixels * config.ZOOM_FACTOR,0,100,10000,60000 + (Math.random()-0.2) * 50000);
    this.createFogSprite(this.map.widthInPixels * config.ZOOM_FACTOR,this.map.heightInPixels * config.ZOOM_FACTOR,100,10000,90000 + (Math.random()-0.3) * 50000);
    this.createFogSprite(0,this.map.heightInPixels * config.ZOOM_FACTOR,100,10000,120000 + (Math.random()-0.4) * 50000);

    if (config.DEBUG) this.setupDebug();

    this.scoreGraphic = this.add.image(16, 16,'score').setOrigin(0).setScale(0.3).setScrollFactor(0);
    this.scoreDisplay = this.add.text(64, 14, '0', {
      fontSize: '32px',
      color: '#FAEE4D',
      padding: { x: 10, y: 5 }
      // backgroundColor: '#000000',
      // fill: '#ffffff'
    });
    this.scoreDisplay.setShadow(5, 5, 'rgba(0,0,0,0.8)', 15);
    this.scoreDisplay.setScrollFactor(0);
    this.score = 0;
    this.scoreCounter = config.SCORE_INCREMENT_MS;

    this.currentlyDeleting = false;

    this.gameOverInitiated = false;

  }

  createFogSprite(x, y, speed, lifespan, fogTimeout) {
    var fog = new FogSprite(this, x, y, speed, lifespan, fogTimeout);
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

    this.input.keyboard.on('keydown_A', () => {
      this.character.healthbar.hurt(5);
    });

    this.input.keyboard.on('keydown_S', () => {
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


    // We convert all of the Tiled objects with an name 'can' (ID of 5) into sprites. They will get their width
    // & height from the Tiled tile object. Any custom properties on the tile object will also be
    // passed to the sprite creator (e.g. one of the tile object's has an alpha of 0.5).
    this.powerUpSprites = this.map.createFromObjects('spins', 'can', { key: 'can' });
    this.healthSprites = this.map.createFromObjects('spins', 'health', { key: 'health' });

    for (let i=0;i<this.powerUpSprites.length;i++)
    {
      // enable physics before resizing
      this.physics.world.enable(this.powerUpSprites[i]);
      this.powerUpSprites[i].setScale(config.POWERUP_SCALE);

    }
    // this.setScale(config.PLAYER_SCALE);
    this.anims.play('spin_can', this.powerUpSprites);

    for (let i=0;i<this.healthSprites.length;i++)
    {
      // enable physics before resizing
      this.physics.world.enable(this.healthSprites[i]);
      this.healthSprites[i].setScale(config.POWERUP_SCALE);

    }
    // this.setScale(config.PLAYER_SCALE);
    this.anims.play('health_item', this.healthSprites);


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

    // helthitems
    this.healthups = this.physics.add.group();
    for (let i=0;i<this.healthSprites.length;i++)
    {

      this.healthSprites[i].body.allowGravity = false;
      this.healthSprites[i].body.immovable = true;
      this.healthups.add(this.healthSprites[i]);
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
    if (this.gameOverInitiated) return;
    this.gameOverInitiated = true;
    // console.log("Start GAMEOVER!");
    this.sound.stopAll();
    this.scene.stop('Level');
    this.scene.start('Gameover', this.score);
    // for (let i=0;i<this.fogSprites.length;i++)
    //   this.fogSprites[i.destroy];


  }

  checkPlayerCollisions(){
    // this.collidedWithBomb = this.physics.collide(this.character , this.object);
    // if(this.collidedWithBomb){
    //   this.bombPickedUp = true;
    //   this.object.destroy();
    // }

    this.collidedWithPowerUp = this.physics.collide(this.character , this.powerups,
      (char,obj) => {
        // console.log("helo collision!" + obj);
        this.character.addPowerUp();
        this.powerups.remove(obj);
        obj.destroy();
        // console.log(this.powerups);
      });

    this.collidedWithHealthUp = this.physics.collide(this.character , this.healthups,
      (char,obj) => {
        // console.log("helo collision!" + obj);
        this.character.healthbar.heal(config.HEALTH_POWER_UP_HP);
        this.healthups.remove(obj);
        obj.destroy();
        // console.log(this.powerups);
      });
  }

  /**
     *  Handles updates to game logic, physics and game objects.
     *
     *  @protected
     *  @param {number} t - Current internal clock time.
     *  @param {number} dt - Time elapsed since last update.
     */
  update(t, dt) {

    if (this.gameOverInitiated) return;

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
      this.scoreDisplay.setText(this.score);
    }

    // hit timout
    this.fogImmunity -= dt;
    let canBeHit = (this.fogImmunity <= 0);
    // if (canBeHit)
    // {
    //   if (this.character.spinning) canBeHit = false;
    // }

    // idxes to delete
    let toDelete = [];

    for (let i=0; i<this.fogSprites.length; i++) {
      this.fogSprites[i].update(t, dt);


      // spin to erase fog (player invincible)
      if (this.character.spinning)
      {
        let particles = this.fogSprites[i].getParticleOverlap(this.character);
        this.fogSprites[i].deleteParticles(particles);
        if (this.fogSprites[i].isEmitterTouching(this.character) && this.currentlyDeleting == false)
        {
          // console.log("Touching!");
          toDelete.push(i);
        }
      }
      else if (canBeHit)
      {
        let particles = this.fogSprites[i].getParticleOverlap(this.character);
        // let isHit = this.fogSprites[i].calcPlayerHit(this.character);
        let isHit = particles.length > 0;

        if (isHit) {
          this.fogImmunity = config.FOG_IMMUNITY_MS;
          this.fogSprites[i].damage(this.character, particles);
          // this.cameras.main.shake(1000);
        }
      }

    }

    // delete emitters in case toDelete is filled
    for (let i=0;i<toDelete.length;i++)
    {
      this.currentlyDeleting = true;
      let deadFog = this.fogSprites[toDelete[i]];
      let deadParticles = deadFog.particles;
      this.tweens.add({
        targets:  this.fogSprites[toDelete[i]],
        alpha: 0,
        ease: 'Power1',
        duration: 1500,
        delay: 50,
        onComplete: () => {

          deadParticles.destroy();
          deadFog.destroy();
          this.destroySound.play({ loop: false });
          this.score += config.ENEMY_DEFEAT_SCORE;
          if (!this.gameOverInitiated) this.cameras.main.flash(500);
          this.createFogSprite(this.map.widthInPixels * config.ZOOM_FACTOR,this.map.heightInPixels * config.ZOOM_FACTOR,100,10000,5000 + (Math.random()-0.3) * 10000);
          this.fogSprites.splice(toDelete[i], 1);
          this.currentlyDeleting = false;
        }
      });


    }

  }

}
