import Logo from '@/objects/logo';

export default class Game extends Phaser.Scene {
  /**
   *  A sample Game scene, displaying the Phaser logo.
   *
   *  @extends Phaser.Scene
   */
  constructor() {
    super({key: 'Game'});
  }

  /**
   *  Called when a scene is initialized. Method responsible for setting up
   *  the game objects of the scene.
   *
   *  @protected
   *  @param {object} data Initialization parameters.
   */
  create(/* data */) {
    //  TODO: Replace this content with really cool game code here :)
    this.logo = this.add.existing(new Logo(this));

    const x_mid = this.cameras.main.width / 2;
    const y_mid = this.cameras.main.height / 2;
    const y_top = 50

    // foglabel
    const labelfog = this.add.text(x_mid/2, y_top, 'Fog', {
      font: '20px Arial',
      color: 'white',
      stroke: 'black',
      strokeThickness: 6
    });
    labelfog.setOrigin(0.5, 0.5).setInteractive();
    labelfog.on('pointerup', () => this.scene.start('Fogtemp'));

    // charlabel
    const labelchar = this.add.text(x_mid, y_top, 'Char', {
      font: '20px Arial',
      color: 'white',
      stroke: 'black',
      strokeThickness: 6
    });
    labelchar.setOrigin(0.5, 0.5).setInteractive();
    labelchar.on('pointerup', () => this.scene.start('Chartemp'));

    // berndlabel
    const labelbernd = this.add.text(x_mid*1.5, y_top, 'Bernd', {
      font: '20px Arial',
      color: 'white',
      stroke: 'black',
      strokeThickness: 6
    });
    labelbernd.setOrigin(0.5, 0.5).setInteractive();
    labelbernd.on('pointerup', () => this.scene.start('Bernd'));

    // tilemap
    const labeltilemap = this.add.text(x_mid/2, y_top*2, 'Tilemap', {
      font: '20px Arial',
      color: 'white',
      stroke: 'black',
      strokeThickness: 6
    });
    labeltilemap.setOrigin(0.5, 0.5).setInteractive();
    labeltilemap.on('pointerup', () => this.scene.start('Tilemaptemp'));

    // title
    const titlelabel = this.add.text(x_mid, y_top*2, 'Title', {
      font: '20px Arial',
      color: 'white',
      stroke: 'black',
      strokeThickness: 6
    });
    titlelabel.setOrigin(0.5, 0.5).setInteractive();
    titlelabel.on('pointerup', () => this.scene.start('Title'));

    // level
    const levellabel = this.add.text(x_mid*1.5, y_top*2, 'Level', {
      font: '20px Arial',
      color: 'white',
      stroke: 'black',
      strokeThickness: 6
    });
    levellabel.setOrigin(0.5, 0.5).setInteractive();
    levellabel.on('pointerup', () => this.scene.start('Level'));

  }

  /**
   *  Called when a scene is updated. Updates to game logic, physics and game
   *  objects are handled here.
   *
   *  @protected
   *  @param {number} t Current internal clock time.
   *  @param {number} dt Time elapsed since last update.
   */
  update(/* t, dt */) {
    //this.logo.update();
  }
}
