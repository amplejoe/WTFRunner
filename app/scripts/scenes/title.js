export default class Title extends Phaser.Scene {
  /**
   *  My custom scene.
   *
   *  @extends Phaser.Scene
   */
  constructor() {
    super({key: 'Title'});
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

    this.add.image(0, 0, 'intro-screen').setOrigin(0).setScale(0.9);

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
