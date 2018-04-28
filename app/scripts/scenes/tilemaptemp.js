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
    let map = this.make.tilemap({key:'desert_tilemap', tileWidth: 32, tileHeight: 32});
    let tileset = map.addTilesetImage('desert_sprites');
    var layer = map.createStaticLayer(0, tileset, 0, 0); // layer index, tileset, x, y
  }

  /**
   *  Handles updates to game logic, physics and game objects.
   *
   *  @protected
   *  @param {number} t - Current internal clock time.
   *  @param {number} dt - Time elapsed since last update.
   */
  update(/* t, dt */) {
  }
}
