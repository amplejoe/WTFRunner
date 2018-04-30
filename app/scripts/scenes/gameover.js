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
    // const y_mid = this.cameras.main.height / 2;

    // var introScreen = this.add.image(0, 0, 'intro-screen').setOrigin(0);
    this.add.image(0, 0, 'gameover').setOrigin(0);

    let msg = this.endScore;
    const label = this.add.text(x_mid * 1.04, 91, msg, {
      font: '60px Arial',
      color: '#FAEE4D',
      stroke: 'black',
      strokeThickness: 6
    });
    label.setOrigin(0, 0.5);

    this.gameoverSound = this.sound.add('gameoverSound');
    this.gameoverSound.play();
    this.gameoverMusic = this.sound.add('gameovermusic');
    this.gameoverMusic.play();


    // const retrylabel = this.add.text(x_mid, y_mid*1.2, 'Retry', {
    //   font: '20px Arial',
    //   color: 'white',
    //   stroke: 'black',
    //   strokeThickness: 6
    // });
    // retrylabel.setOrigin(0.5, 0.5).setInteractive();
    // retrylabel.on('pointerup', () => this.scene.start('Game'));

    this.retryButton = this.add.image(this.cameras.main.width  * (1/2), this.cameras.main.height  * (3/4), 'retry').setOrigin(0);
    this.retryButton.setScale(0.2);
    this.retryButton.setOrigin(0.5).setInteractive();
    // retryButton.rotation = -1;
    this.retryButton.scaleX *= -1;
    this.retryButton.on('pointerup', () => {
      this.restartGame();
    });

    this.timeout = 3000;
    this.isTweenSet = false;


  }

  restartGame()
  {
    this.sound.stopAll();
    this.input.keyboard._events = {};
    this.scene.stop('Gameover');
    this.scene.start('Title');
  }

  /**
   *  Handles updates to game logic, physics and game objects.
   *
   *  @protected
   *  @param {number} t - Current internal clock time.
   *  @param {number} dt - Time elapsed since last update.
   */
  update( t, dt ) {
    this.timeout -= dt;
    if (this.timeout <= 0)
    {
      if (this.isTweenSet) return;

      this.input.keyboard.on('keydown_ENTER', () => {
        this.restartGame();
      });
      // all eases: https://labs.phaser.io/edit.html?src=src\tweens\ease%20equations.js
      this.tweens.add(
        {
          targets: this.retryButton,
          duration: 2000,
          alpha: 0,
          ease: 'Linear',
          repeat: -1,
          yoyo: true
        }, this);
      this.isTweenSet = true;
    }
  }

}
