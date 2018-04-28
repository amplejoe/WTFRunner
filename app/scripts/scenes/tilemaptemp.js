export default class Tilemaptemp extends Phaser.Scene {
  /**
   *  My custom scene.
   *
   *  @extends Phaser.Scene
   */
  constructor() {
    super({key: 'Tilemaptemp'});
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

    this.sys.install('AnimatedTiles');

    const x_mid = this.cameras.main.width / 2;
    const y_mid = this.cameras.main.height / 2;
    const label = this.add.text(x_mid, y_mid, 'I am Tilemap', {
      font: '20px Arial',
      color: 'white',
      stroke: 'black',
      strokeThickness: 6
    });

    //  add tilemap to game

    // with csv
    // let map = this.make.tilemap({key:'desert_tilemap', tileWidth: 32, tileHeight: 32});
    // let map = this.make.tilemap({key:'desert_tilemap'});
    // let tileset = map.addTilesetImage('desert_sprites');
    // var layer = map.createStaticLayer(0, tileset, 0, 0); // layer index, tileset, x, y
    // var layer = map.createDynamicLayer(0, tileset, 0, 0);

    // with json
    this.map = this.make.tilemap({key: 'level_1_map'});
    var tileset = this.map.addTilesetImage('wtf_sheet','level_sprites');
    this.layer = this.map.createDynamicLayer('Kachelebene 1', tileset, 0, 0);

    // init animated tiles
    this.sys.animatedTiles.init(this.map);
    this.sys.animatedTiles.resume(0,0);
    this.sys.animatedTiles.updateAnimatedTiles();

    // start dat.gui
    // window.startGui(this.sys.animatedTiles);


    let zoomFactor = 0.5;
    this.layer.setScale(zoomFactor);

    this.cameras.main.setBounds(0, 0, this.map.widthInPixels * zoomFactor, this.map.heightInPixels*zoomFactor);
    // this.cameras.main.setZoom(zoomFactor);


    var cursors = this.input.keyboard.createCursorKeys();
    var controlConfig = {
      camera: this.cameras.main,
      left: cursors.left,
      right: cursors.right,
      up: cursors.up,
      down: cursors.down,
      speed: 0.5
    };
    this.controls = new Phaser.Cameras.Controls.Fixed(controlConfig);

    var help = this.add.text(16, 16, 'Arrows to scroll', {
      fontSize: '18px',
      padding: { x: 10, y: 5 },
      backgroundColor: '#000000',
      fill: '#ffffff'
    });
    help.setScrollFactor(0);

    // countdown 5 sek until change
    this.countdown = 5000;
    this.changed = false;

  }

  /**
   *  Handles updates to game logic, physics and game objects.
   *
   *  @protected
   *  @param {number} t - Current internal clock time.
   *  @param {number} dt - Time elapsed since last update.
   */
  update(t, dt) {
    this.controls.update(dt);

    // this.sys.animatedTiles.updateAnimatedTiles();

    // this.countdown -= dt;
    // // countdown is done, but the change hasn't been done
    // if(this.countdown <0 && !this.changed){
    //   // Native API-method to fill area with tiles
    //   // this.layer.fill(1525, 1, 1, 3, 3);
    //   // Need to tell the plugin about the new tiles.
    //   // ATM it will go through all tilemaps and layers,
    //   // but I'll add support for limiting the task to
    //   // maps, layers and areas within that.
    //   this.sys.animatedTiles.updateAnimatedTiles();
    //   // Ok. don't hammer tiles on each update-loop. the change is done.
    //   this.changed = true;
    //   console.log("update");
    // }


  }
}
