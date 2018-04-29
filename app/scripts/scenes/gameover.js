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
    
    this.add.image(0, 0, 'gameover').setOrigin(0);
    
    let msg = 'Score: '+ this.endScore+'';
    const label = this.add.text(x_mid, y_mid, msg, {
      font: '40px Arial',
      color: 'white',
      stroke: 'black',
      strokeThickness: 6
    });
    label.setOrigin(0.5, 0.5);
    
    this.gameoverSound = this.sound.add('gameoverSound');
    this.gameoverSound.play();

    const retrylabel = this.add.text(x_mid, y_mid*1.2, 'Retry', {
      font: '20px Arial',
      color: 'white',
      stroke: 'black',
      strokeThickness: 6
    });
    retrylabel.setOrigin(0.5, 0.5).setInteractive();
    retrylabel.on('pointerup', () => this.scene.start('Game'));
    
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