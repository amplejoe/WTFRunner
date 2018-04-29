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

    this.dancingChar = this.add.sprite(introScreen.width/4, introScreen.height/2, 'dance');
    this.powerUpCan = this.add.sprite(introScreen.width/3, introScreen.height/2, 'powerUp');

    var startbutton = this.add.sprite(introScreen.width * (2/3), introScreen.height * (2.5/4), 'start').setOrigin(0);
    startbutton.setScale(0.6);
    startbutton.rotation = -0.6;
    startbutton.setOrigin(0.5, 0.5).setInteractive();
    startbutton.on('pointerup', () => this.scene.start('Level'));

    this.anims.create({
      key: 'spin_can',
      frames: this.anims.generateFrameNumbers('powerUp', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'dance',
      frames: this.anims.generateFrameNumbers('player', {frames: [1,2,3,2,1,6,5,4,5,6]}),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'startbutton',
      frames: this.anims.generateFrameNumbers('start', {frames: [0,1]}),
      frameRate: 10,
      repeat: -1
    });
    startbutton.anims.play('startbutton',true);

    this.powerUpCan.anims.play('spin_can',true);
    this.powerUpCan.rotation = 0.2;

    this.dancingChar.anims.play('dance',true);
    this.dancingChar.rotation = 0.5;

    this.music = this.sound.add('startMusic');
    this.music.play({ loop: true });

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
