/*
 *  `assets` module
 *  ===============
 *
 *  Static assets to be loaded. Files are declared using 'Scene Asset Payload'
 *  format. Assets are assumed to live in the `app/static/assets/` folder.
 */

/**
 *  Splash screen assets.
 */
export const splashScreenAssets = [{
  key: 'splash-screen',
  type: 'image'
}, {
  key: 'progress-bar',
  type: 'image'
}];

/**
 *  General assets used throughout the game.
 */
export const gameAssets = [{
  key: 'logo',
  type: 'image'
}, {
  key: 'desert_tilemap',
  type: 'tilemapCSV',
  url: 'tilemaptmp/desert_level.csv'
}, {
  key: 'desert_sprites',
  type: 'spritesheet',
  url: 'tilemaptmp/sprites_no_padding.png',
  config: {frameWidth: 32, frameHeight: 32}
},{
  key:'smoke-puff',
  type: 'image',
  url: 'particles/smoke-puff.png'
}];
