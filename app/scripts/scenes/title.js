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

    // const x_mid = this.cameras.main.width / 2;
    // const y_mid = this.cameras.main.height / 2;

    var introScreen = this.add.image(0, 0, 'intro-screen').setOrigin(0);
    // Phaser.Display.Align.In.Center(introScreen, this.add.zone(450, 300, this.cameras.main.width, this.cameras.main.height));

    this.dancingChar = this.add.sprite(introScreen.width/4, introScreen.height/2, 'dance2');
    this.powerUpCan = this.add.sprite(introScreen.width/3, introScreen.height/2, 'powerUp');

    this.powerUpCan.anims.play('spin_can',true);
    this.powerUpCan.rotation = 0.2;

    this.dancingChar.anims.play('dance',true);
    this.dancingChar.rotation = 0.5;

    this.music = this.sound.add('startMusic');
    this.music.play({ loop: true });

    var startbutton = this.add.sprite(introScreen.width * (2/3), introScreen.height * (2.5/4), 'start').setOrigin(0);
    startbutton.setScale(0.6);
    startbutton.rotation = -0.6;
    startbutton.setOrigin(0.5, 0.5).setInteractive();
    startbutton.on('pointerup', () => this.startGame());


    startbutton.anims.play('anim_start_button',true);

    this.input.keyboard.on('keydown_ENTER', () => {
      this.startGame();
    });


  }

  startGame()
  {
    this.music.stop();
    // console.log(this.input.keyboard._events);
    this.input.keyboard._events = {};
    // this.input.keyboard.stop();
    this.scene.stop('Title');
    this.scene.start('Level');
  }

  /**
   *  Handles updates to game logic, physics and game objects.
   *
   *  @protected
   *  @param {number} t - Current internal clock time.
   *  @param {number} dt - Time elapsed since last update.
   */
  update(/* t, dt */) {

    //this.dancingChar.rotation = this.dancingChar.rotation + 0.01;

  }

}
