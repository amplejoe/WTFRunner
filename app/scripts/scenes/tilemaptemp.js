export default class Tilemaptemp extends Phaser.Scene {
  /**
   *  My custom scene.
   *
   *  @extends Phaser.Scene
   */
  constructor() {
    super({key: 'Tilemaptemp'});
  }

  /**
   *  Responsible for setting up game objects on the screen.
   *
   *  @protected
   *  @param {object} [data={}] - Initialization parameters.
   */
  create(/* data */) {
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
    let map = this.add.tilemap('level_1_map');
    var tileset = map.addTilesetImage('wtf_sheet','level_sprites');
    let layer = map.createDynamicLayer('Kachelebene 1', tileset, 0, 0);




    let zoomFactor = 0.5;
    layer.setScale(zoomFactor);

    this.cameras.main.setBounds(0, 0, map.widthInPixels * zoomFactor, map.heightInPixels*zoomFactor);
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
  }
}
