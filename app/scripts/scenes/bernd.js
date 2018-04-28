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

    // this.playerHealthMeter = this.game.add.plugin(Phaser.Plugin.HealthMeter);
    // this.playerHealthMeter.bar(
    //     this.player,
    //     {x: 20, y: 100, width: 100, height: 20}
    // );


    this.input.keyboard.on('keydown_A', (event) => {
      this.hurt(1);
    });

    this.input.keyboard.on('keydown_S', (event) => {
      this.heal(1);
    });


    this.healthBar

    this.healthBarBack = this.add.graphics({ fillStyle: { color: 0x0aaf2e } });
    this.healthBar = this.add.graphics({ fillStyle: { color: 0x7df433 } });
    this.healthBarBack.setScrollFactor(0);
    this.healthBar.setScrollFactor(0);

    var rect = new Phaser.Geom.Rectangle(this.cameras.main.width - 50, this.cameras.main.height - 120, 30, 100);
    this.healthBarBack.fillRectShape(rect);

    this.health = 100;
    this.maxHealth = 100;

    this.updateHealthBar();



  }


  heal(amount) {
      this.health = Math.min(this.maxHealth, this.health + amount);
      this.updateHealthBar();
  }

  hurt(amount) {
      this.health -= amount;
      if (this.health < 0) {
          this.gameOver();
      }
      this.updateHealthBar();
  }

  gameOver() {
      alert("GAME OVER");
  }

  updateHealthBar() {
    var height = 90 * this.health/this.maxHealth;
    var rect = new Phaser.Geom.Rectangle(this.cameras.main.width - 45, this.cameras.main.height - height - 25, 20, height);
    this.healthBar.clear();
    this.healthBar.fillRectShape(rect);
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
