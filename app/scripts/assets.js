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
},{
  key: 'desert_sprites',
  type: 'spritesheet',
  url: 'tilemaptmp/sprites_no_padding.png',
  config: {frameWidth: 32, frameHeight: 32}
},{
  key:'smoke-puff',
  type: 'image',
  url: 'particles/smoke-puff.png'
}, {
  key: 'desert_tilemap',
  type: 'tilemapCSV',
  url: 'tilemaptmp/desert_level.csv'
},{
  key: 'desert_tilemap_json',
  type: 'tilemapTiledJSON',
  url: 'tilemaptmp/desert_level.json'
},{
  // game tiles
  key: 'level_sprites',
  type: 'image',
  url: 'tilemaps/wtf_sheet.png'
},{
  // first level
  key: 'level_1_map',
  type: 'tilemapTiledJSON',
  url: 'tilemaps/wtf_map_100x100.json'
},{
  key: 'music1',
  type: 'audio',
  url: 'audio/music1.mp3'
},{
  key: 'music2',
  type: 'audio',
  url: 'audio/music2.mp3'
},{
  key: 'music3',
  type: 'audio',
  url: 'audio/music3.mp3'
},{
  key: 'music4',
  type: 'audio',
  url: 'audio/music4.mp3'
},{
  key: 'music5',
  type: 'audio',
  url: 'audio/music5.mp3'
},{
  key: 'gameoverSound',
  type: 'audio',
  url: 'audio/gameover.mp3'
},{
  key: 'dangerSound',
  type: 'audio',
  url: 'audio/danger.mp3'
},{
  key: 'collectSound',
  type: 'audio',
  url: 'audio/collect.mp3'
},{
  // character / player
   key: 'player',
   type: 'spritesheet',
   url: 'char/char.png',
   config: {
     frameWidth : 128,
     frameHeight : 128
   }
},{
   // the spin for the character
   key: 'player_spin',
   type: 'spritesheet',
   url: 'char/char_spin.png',
   config: {
     frameWidth : 128,
     frameHeight : 128
   }
},{
   // powerUp for the character
   key: 'powerUp',
   type: 'spritesheet',
   url: 'char/spin_item.png',
   config: {
     frameWidth : 128,
     frameHeight : 128
   } 
}];
