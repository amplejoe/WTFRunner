import Healthbar from '@/objects/healthbar';

export default class Bernd extends Phaser.Scene {
  /**
   *  My custom scene.
   *
   *  @extends Phaser.Scene
   */
  constructor() {
    super({key: 'Bernd'});
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
    // let map = this.make.tilemap({key:'desert_tilemap', tileWidth: 32, tileHeight: 32});
    let map = this.make.tilemap({key:'desert_tilemap'});
    let tileset = map.addTilesetImage('desert_sprites');
    // var layer = map.createStaticLayer(0, tileset, 0, 0); // layer index, tileset, x, y
    var layer = map.createDynamicLayer(0, tileset, 0, 0);

    let zoomFactor = 2.0;
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

    this.healthbar = new Healthbar(this,this.cameras.main.width - 70, 20, 40, 200);

    this.input.keyboard.on('keydown_A', (event) => {
        this.healthbar.hurt(5);
    });

    this.input.keyboard.on('keydown_S', (event) => {
        this.healthbar.heal(5);
    });

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

    // var graphics = this.add.graphics();
    //
    //   var color = 0xffff00;
    //   var alpha = 0.5;
    //
    //   graphics.fillStyle(color, alpha);
    //   graphics.fillRect(300, 300 ,25, 100);


    // if (!this.healthBar) {
    //     var bmd = this.add.bitmapData(this.options.width, this.options.height);
    //     bmd.ctx.beginPath();
    //     bmd.ctx.rect(0, 0, this.options.width, this.options.height);
    //     bmd.ctx.fillStyle = this.options.background;
    //     bmd.ctx.fill();
    //
    //     var backBar = this.add.sprite(this.options.x, this.options.y, bmd);
    //     backBar.alpha = this.options.alpha;
    //     backBar.fixedToCamera = true;
    //
    //     bmd = this.add.bitmapData(this.options.width, this.options.height);
    //     bmd.ctx.beginPath();
    //     bmd.ctx.rect(0, 0, this.options.width, this.options.height);
    //     bmd.ctx.fillStyle = this.options.foreground;;
    //     bmd.ctx.fill();
    //     this.healthBar = this.add.sprite(this.options.x, this.options.y, bmd);
    //     this.healthBar.width = this.options.width;
    //     this.healthBar.fixedToCamera = true;
    //
    //     return;
    // }
    //
    // this.add.tween(this.healthBar).to(
    //     {width: (this.health / this.maxHealth) * this.options.width},
    //     200, "Linear", true
    // );
  }
}
