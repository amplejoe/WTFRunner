export default class Gameover extends Phaser.Scene {
  /**
   *  My custom scene.
   *
   *  @extends Phaser.Scene
   */
  constructor() {
    super({key: 'Gameover'});

  }

  init(score)
  {
    this.endScore = score;
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
    let msg = 'GAME OVER! (Score: '+ this.endScore+')';
    const label = this.add.text(x_mid, y_mid, msg, {
      font: '20px Arial',
      color: 'white',
      stroke: 'black',
      strokeThickness: 6
    });
    this.gameoverSound = this.sound.add('gameoverSound');
    this.gameoverSound.play();
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
