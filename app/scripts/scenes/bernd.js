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



    this.input.keyboard.on('keydown_A', (event) => {
        this.hurt(1);
    });

    this.input.keyboard.on('keydown_S', (event) => {
        this.heal(1);
    });

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
      this.health = Math.max(0, this.health - amount);
      this.updateHealthBar();
      if (this.health <= 0) {
          this.gameOver();
      }
  }

  gameOver() {
      alert("GAME OVER");
  }

  updateHealthBar() {
    var height = 90 * this.health/this.maxHealth;
    var rect = new Phaser.Geom.Rectangle(this.cameras.main.width - 45, this.cameras.main.height - height - 25, 20, height);
    this.healthBar.clear();
    this.healthBar.fillStyle(this.rgbToHex(this.HSVtoRGB(this.health/this.maxHealth*0.38, 1, 1)));
    this.healthBar.fillRectShape(rect);
  }

// 120 - 0  ~

  /* accepts parameters
 * h  Object = {h:x, s:y, v:z}
 * OR
 * h, s, v
*/
HSVtoRGB(h, s, v) {
    var r, g, b, i, f, p, q, t;
    if (arguments.length === 1) {
        s = h.s, v = h.v, h = h.h;
    }
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }
    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };

}

componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

rgbToHex(rgb) {
    return "0x" + this.componentToHex(rgb.r) + this.componentToHex(rgb.g) + this.componentToHex(rgb.b);
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
