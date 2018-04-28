export default class Healthbar {

  constructor(scene, x, y, w, h) {

    this.scene = scene;

    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.border = 5;

    this.health = 100;
    this.maxHealth = 100;

    this.healthBarBack = this.scene.add.graphics({ fillStyle: { color: 0x0aaf2e } });
    this.healthBar = this.scene.add.graphics();
    this.healthBarBack.setScrollFactor(0);
    this.healthBar.setScrollFactor(0);

    var rect = new Phaser.Geom.Rectangle(x, y, w, h);
    this.healthBarBack.fillRectShape(rect);

    this.music1 = this.scene.sound.add('music1');
    this.music1.play({ loop: true });
    this.music2 = this.scene.sound.add('music2');
    this.music2.play({ loop: true });
    this.music3 = this.scene.sound.add('music3');
    this.music3.play({ loop: true });
    this.music4 = this.scene.sound.add('music4');
    this.music4.play({ loop: true });
    this.music5 = this.scene.sound.add('music5');
    this.music5.play({ loop: true });

    this.music1.mute = false;
    this.music2.mute = true;
    this.music3.mute = true;
    this.music4.mute = true;
    this.music5.mute = true;


    this.updateHealthBar();

    //  Add this game object to the owner scene.
    // scene.children.add(this);
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
    var relHealth = this.health/this.maxHealth;
    var height = (this.h - 2*this.border) * relHealth;
    var rect = new Phaser.Geom.Rectangle(this.x + this.border, this.y + this.h - height - this.border, this.w - 2*this.border, height);
    this.healthBar.clear();
    this.healthBar.fillStyle(this.rgbToHex(this.HSVtoRGB(relHealth*0.38, 1, 1)));
    this.healthBar.fillRectShape(rect);

    // this.music1.rate = 1 - (1-relHealth)/3;
    // this.music1.detune = (1 - relHealth) * -400;

    if (relHealth <= 0.2) {
      this.music1.mute = true;
      this.music2.mute = true;
      this.music3.mute = true;
      this.music4.mute = true;
      this.music5.mute = false;
    } else if (relHealth <= 0.4) {
      this.music1.mute = true;
      this.music2.mute = true;
      this.music3.mute = true;
      this.music4.mute = false;
      this.music5.mute = true;
    } else if (relHealth <= 0.6) {
      this.music1.mute = true;
      this.music2.mute = true;
      this.music3.mute = false;
      this.music4.mute = true;
      this.music5.mute = true;
    } else if (relHealth <= 0.8) {
      this.music1.mute = true;
      this.music2.mute = false;
      this.music3.mute = true;
      this.music4.mute = true;
      this.music5.mute = true;
    } else {
      this.music1.mute = false;
      this.music2.mute = true;
      this.music3.mute = true;
      this.music4.mute = true;
      this.music5.mute = true;
    }



  }

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

}
