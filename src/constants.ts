// import { svg } from "./dom-selects";
import { WaveDefinition } from "./WaveDefinition";

export const FPS = 15;
export const EXPLOSION_RADIUS = 30;

export const initialGold = 200;
export const initialEmeralds = 50;
export const initialCastleHP = 10;

// export const sceneRect = svg.getBoundingClientRect();
export const TILE_WIDTH = 100;
export const MARGIN = TILE_WIDTH / 2;

export const menuIcons = {
  trap: [
    {
      id: "mine-trap-icon",
      type: "mine",
      x: 20,
      y: 25,
      color: "orangered",
      img: "/assets/icons/bullseye.svg",
    },
    {
      id: "slime-trap-icon",
      type: "slime",
      x: 20,
      y: 125,
      color: "#22b165",
      img: "/assets/icons/bottle-droplet.svg",
    },
    {
      id: "poison-trap-icon",
      type: "poison",
      x: 130,
      y: 25,
      color: "lightgreen",
      img: "/assets/icons/flask.svg",
    },
    {
      id: "ice-trap-icon",
      type: "ice",
      x: 130,
      y: 125,
      color: "lightblue",
      img: "/assets/icons/icicles.svg",
    },
  ],
  newPath: [
    {
      id: "shovel-right-icon",
      type: "shovel-right",
      x: 150,
      y: 75,
      color: "red",
      img: "/assets/icons/shovel.svg",
    },
    {
      id: "shovel-left-icon",
      type: "shovel-left",
      x: 0,
      y: 75,
      color: "red",
      img: "/assets/icons/shovel.svg",
    },
    {
      id: "shovel-bottom-icon",
      type: "shovel-bottom",
      x: 75,
      y: 150,
      color: "red",
      img: "/assets/icons/shovel.svg",
    },
  ],
  tower: [
    {
      id: "upgrade-icon",
      type: "upgrade",
      x: 75,
      y: 0,
      color: "#7dfd90",
      img: "/assets/icons/upgrade.svg",
    },
    {
      id: "sell-icon",
      type: "sell",
      x: 10, // 310
      y: 115, // 213
      color: "gold",
      img: "/assets/icons/sack-dollar.svg",
    },
    {
      id: "info-icon",
      type: "info",
      x: 140, // 440 - 30
      y: 115, // 215 - 225
      color: "#ddd",
      img: "/assets/icons/book.svg",
    },
  ],
  newTower: [
    {
      id: "fire-tower-add-icon",
      type: "fire",
      x: 75,
      y: 0,
      color: "red",
      img: "/assets/icons/fire.svg",
    },
    {
      id: "lightning-tower-add-icon",
      type: "lightning",
      x: 150,
      y: 75,
      color: "gold",
      img: "/assets/icons/bolt.svg",
    },
    {
      id: "ice-tower-add-icon",
      type: "ice",
      x: 0,
      y: 75,
      color: "dodgerblue",
      img: "/assets/icons/snowflake.svg",
    },
    {
      id: "earth-tower-add-icon",
      type: "earth",
      x: 75,
      y: 150,
      color: "orange",
      img: "/assets/icons/mountain.svg",
    },
  ],
};

export const TOWERS = {
  fire: {
    name: "fire",
    damage: 15,
    range: 150,
    rate_of_fire: 10,
    xp: 0,
    fill: "red",
    price: 100,
    bullet_speed: 180,
    img: "/assets/sprites/fire-tower.svg",
  },
  ice: {
    name: "ice",
    damage: 30,
    range: 280,
    rate_of_fire: 2,
    xp: 0,
    fill: "dodgerblue",
    price: 100,
    bullet_speed: 140,
    img: "/assets/sprites/ice-tower.svg",
  },
  lightning: {
    name: "lightning",
    damage: 75,
    range: 230,
    rate_of_fire: 1,
    xp: 0,
    fill: "gold",
    price: 100,
    bullet_speed: 200,
    img: "/assets/sprites/lightning-tower.svg",
  },
  earth: {
    name: "earth",
    damage: 140,
    range: 180,
    rate_of_fire: 0.5,
    xp: 0,
    fill: "orange",
    price: 100,
    bullet_speed: 100,
    img: "/assets/sprites/earth-tower.svg",
  },
};

export const ENEMIES = {
  goblin: {
    name: "goblin",
    speed: 10,
    hp: 100,
    gold: 4,
    fill: "forestgreen",
    size: 6,
  },
  orc: {
    name: "orc",
    speed: 8,
    hp: 200,
    gold: 7,
    fill: "darkgreen",
    size: 8,
  },
  troll: {
    name: "troll",
    speed: 5,
    hp: 500,
    gold: 20,
    fill: "#041",
    size: 12,
  },
  dragon: {
    name: "dragon",
    speed: 2.5,
    hp: 2500,
    gold: 20,
    fill: "red",
    size: 15,
  },
};

export const STAGES_AND_WAVES = {
  1: {
    stage: {
      number: 1,
      name: "cozy hills",
      firstWaveAtRow: 4,
      cols: 4,
      entrypoint: 0,
      vegetation: "grasslands",
      baseTile: "grass",
      rows: null,
    },
    // blockedTiles[row][col]
    blockedTiles: {
      5: [2],
      6: [3],
    },
    wallTiles: {
      0: [3],
      1: [1, 3],
      3: [0],
    },
    waves: [],
  },
  2: {
    stage: {
      number: 2,
      name: "Guadalajara road",
      firstWaveAtRow: 2,
      entrypoint: 2,
      cols: 5,
      vegetation: "desert",
      baseTile: "dirt",
      rows: null,
    },
    wallTiles: {
      2: [1, 3],
      4: [1, 3],
    },
    blockedTiles: {
      1: [0, 4],
      2: [0, 4],
      4: [2],
    },
    waves: [],
  },
  3: {
    stage: {
      number: 3,
      name: "Urca sunset",
      firstWaveAtRow: 3,
      entrypoint: 1,
      cols: 3,
      vegetation: "grasslands",
      baseTile: "grass",
      rows: null,
    },
    blockedTiles: {},
    wallTiles: {
      2: [1],
      4: [0, 2],
      6: [1, 2],
    },
    waves: [],
  },
  4: {
    stage: {
      number: 2,
      name: "Lapa boulevard",
      firstWaveAtRow: 3,
      entrypoint: 3,
      cols: 4,
      vegetation: "desert",
      baseTile: "dirt",
      rows: null,
    },
    blockedTiles: {
      1: [0],
      2: [3],
      6: [0, 1],
    },
    wallTiles: {
      2: [0, 1],
      4: [1, 2],
    },
    waves: [],
  },
  5: {
    stage: {
      number: 2,
      name: "Piemont Square",
      firstWaveAtRow: 2,
      entrypoint: 1,
      cols: 3,
      vegetation: "grasslands",
      baseTile: "grass",
      rows: null,
    },
    blockedTiles: {},
    wallTiles: {
      2: [0, 1],
      4: [1, 2],
    },
    waves: [],
  },
};

// enemyType, lane, quantity, startingAt, interval? = 1,
// 1
// STAGES_AND_WAVES[1].waves[0] = new WaveDefinition()
//   .defEnemySeq("goblin", "center", 5, 5)
//   .defEnemySeq("goblin", "center", 5, 10)
//   .defEnemySeq("goblin", "left", 2, 12.5, 4).wave;

// STAGES_AND_WAVES[1].waves[1] = new WaveDefinition()
//   .defEnemySeq("goblin", "center", 6, 5)
//   .defEnemySeq("orc", "center", 3, 1, 12).wave;

// STAGES_AND_WAVES[1].waves[2] = new WaveDefinition()
//   .defEnemySeq("goblin", "left", 6, 5)
//   .defEnemySeq("goblin", "right", 6, 5, 1)
//   .defEnemySeq("orc", "center", 2, 12, 12).wave;

// STAGES_AND_WAVES[1].stage.rows =
//   STAGES_AND_WAVES[1].stage.firstWaveAtRow + STAGES_AND_WAVES[1].waves.length;

// // 2
// STAGES_AND_WAVES[2].waves[0] = new WaveDefinition()
//   .defEnemySeq("goblin", "left", 10, 0, 3)
//   .defEnemySeq("goblin", "center", 10, 10, 3).wave;

// STAGES_AND_WAVES[2].waves[1] = new WaveDefinition()
//   .defEnemySeq("goblin", "center", 6, 5)
//   .defEnemySeq("orc", "center", 1, 12, 1).wave;

// STAGES_AND_WAVES[2].waves[2] = new WaveDefinition()
//   .defEnemySeq("goblin", "left", 6, 5)
//   .defEnemySeq("goblin", "right", 6, 1, 5)
//   .defEnemySeq("dragon", "center", 1, 5)
//   .defEnemySeq("orc", "center", 2, 12, 12).wave;

// STAGES_AND_WAVES[2].waves[3] = new WaveDefinition()
//   .defEnemySeq("dragon", "center", 2, 10)
//   .defEnemySeq("goblin", "left", 6, 5)
//   .defEnemySeq("goblin", "right", 6, 1, 5)
//   .defEnemySeq("orc", "center", 2, 12, 12).wave;

// STAGES_AND_WAVES[2].stage.rows =
//   STAGES_AND_WAVES[2].stage.firstWaveAtRow + STAGES_AND_WAVES[2].waves.length;

// // 3
// STAGES_AND_WAVES[3].waves[0] = new WaveDefinition()
//   .defEnemySeq("goblin", "left", 6, 0, 5)
//   .defEnemySeq("goblin", "right", 6, 2.5, 5)
//   .defEnemySeq("orc", "center", 2, 12, 12).wave;

// STAGES_AND_WAVES[3].waves[1] = new WaveDefinition()
//   .defEnemySeq("goblin", "left", 10, 0)
//   .defEnemySeq("goblin", "right", 10, 10)
//   .defEnemySeq("goblin", "center", 10, 20).wave;

// STAGES_AND_WAVES[3].waves[2] = new WaveDefinition()
//   .defEnemySeq("dragon", "center", 2, 10)
//   .defEnemySeq("goblin", "left", 6, 0, 5)
//   .defEnemySeq("goblin", "right", 6, 1, 5)
//   .defEnemySeq("orc", "center", 2, 12, 12).wave;

// STAGES_AND_WAVES[3].waves[3] = new WaveDefinition()
//   .defEnemySeq("goblin", "left", 10, 0)
//   .defEnemySeq("goblin", "right", 10, 10)
//   .defEnemySeq("goblin", "center", 10, 20).wave;

// STAGES_AND_WAVES[3].waves[4] = new WaveDefinition()
//   .defEnemySeq("dragon", "center", 2, 10)
//   .defEnemySeq("goblin", "left", 6, 0, 5)
//   .defEnemySeq("goblin", "right", 6, 1, 5)
//   .defEnemySeq("orc", "center", 2, 12, 12).wave;

// STAGES_AND_WAVES[3].stage.rows =
//   STAGES_AND_WAVES[3].stage.firstWaveAtRow + STAGES_AND_WAVES[3].waves.length;

// // 4
// STAGES_AND_WAVES[4].waves[0] = new WaveDefinition()
//   .defEnemySeq("goblin", "left", 6, 0, 5)
//   .defEnemySeq("goblin", "right", 6, 2.5, 5)
//   .defEnemySeq("orc", "center", 2, 12, 12).wave;

// STAGES_AND_WAVES[4].waves[1] = new WaveDefinition()
//   .defEnemySeq("goblin", "left", 6, 0, 5)
//   .defEnemySeq("goblin", "right", 6, 1, 5)
//   .defEnemySeq("orc", "center", 2, 12, 12).wave;

// STAGES_AND_WAVES[4].waves[2] = new WaveDefinition()
//   .defEnemySeq("dragon", "center", 1, 10)
//   .defEnemySeq("goblin", "left", 6, 0, 5)
//   .defEnemySeq("goblin", "right", 6, 1, 5)
//   .defEnemySeq("orc", "center", 2, 12, 12).wave;

// STAGES_AND_WAVES[4].waves[3] = new WaveDefinition()
//   .defEnemySeq("dragon", "center", 2, 10, 20)
//   .defEnemySeq("goblin", "left", 6, 0, 5)
//   .defEnemySeq("goblin", "right", 6, 1, 5)
//   .defEnemySeq("orc", "center", 2, 12, 12).wave;

// STAGES_AND_WAVES[4].waves[4] = new WaveDefinition()
//   .defEnemySeq("dragon", "center", 3, 10, 10)
//   .defEnemySeq("goblin", "left", 6, 0, 5)
//   .defEnemySeq("goblin", "right", 6, 1, 5)
//   .defEnemySeq("orc", "center", 2, 12, 12).wave;

// STAGES_AND_WAVES[4].stage.rows =
//   STAGES_AND_WAVES[4].stage.firstWaveAtRow + STAGES_AND_WAVES[4].waves.length;

// // 5
// STAGES_AND_WAVES[5].waves[0] = new WaveDefinition()
//   .defEnemySeq("goblin", "left", 6, 0, 5)
//   .defEnemySeq("goblin", "right", 6, 2.5, 5)
//   .defEnemySeq("orc", "center", 2, 12, 12).wave;

// STAGES_AND_WAVES[5].waves[1] = new WaveDefinition()
//   .defEnemySeq("goblin", "left", 6, 0, 5)
//   .defEnemySeq("goblin", "right", 6, 1, 5)
//   .defEnemySeq("orc", "center", 2, 12, 12).wave;

// STAGES_AND_WAVES[5].waves[2] = new WaveDefinition()
//   .defEnemySeq("dragon", "center", 1, 10)
//   .defEnemySeq("goblin", "left", 6, 0, 5)
//   .defEnemySeq("goblin", "right", 6, 1, 5)
//   .defEnemySeq("orc", "center", 2, 12, 12).wave;

// STAGES_AND_WAVES[5].waves[3] = new WaveDefinition()
//   .defEnemySeq("dragon", "center", 2, 10, 20)
//   .defEnemySeq("goblin", "left", 6, 0, 5)
//   .defEnemySeq("goblin", "right", 6, 1, 5)
//   .defEnemySeq("orc", "center", 2, 12, 12).wave;

// STAGES_AND_WAVES[5].waves[4] = new WaveDefinition()
//   .defEnemySeq("dragon", "center", 3, 10, 10)
//   .defEnemySeq("goblin", "left", 6, 0, 5)
//   .defEnemySeq("goblin", "right", 6, 1, 5)
//   .defEnemySeq("orc", "center", 2, 12, 12).wave;

// STAGES_AND_WAVES[5].stage.rows =
//   STAGES_AND_WAVES[5].stage.firstWaveAtRow + STAGES_AND_WAVES[4].waves.length;

// console.log(STAGES_AND_WAVES);

// waves:
// [
//   // 0
//   [{ type: "goblin", lane: "left", delay: 0 }],
//   // 1
//   [{ type: "troll", lane: "center", delay: 0 }],
//   // 2
//   [{ type: "goblin", lane: "left", delay: 0 }],
//   // 3
//   [{ type: "goblin", lane: "left", delay: 0 }],
//   // 4
//   [{ type: "goblin", lane: "left", delay: 0 }],
//   // 5
//   [{ type: "goblin", lane: "left", delay: 0 }],
//   // 6
//   [{ type: "goblin", lane: "left", delay: 0 }],
//   //7
//   [
//     { type: "orc", lane: "center", delay: 0 },
//     { type: "orc", lane: "center", delay: 0 },
//     { type: "troll", lane: "center", delay: 0 },
//   ],
//   // 8
//   [{ type: "troll", lane: "center", delay: 0 }],
//   [{ type: "dragon", lane: "center", delay: 0 }],
// ],

// waves: [
//   // 1
//   [
//     { type: "goblin", lane: "left", delay: 0 },
//     { type: "goblin", lane: "right", delay: 3 },
//     { type: "goblin", lane: "right", delay: 5 },
//     { type: "goblin", lane: "right", delay: 8 },
//     { type: "goblin", lane: "left", delay: 10 },
//     { type: "goblin", lane: "left", delay: 13 },
//     { type: "goblin", lane: "left", delay: 16 },
//     { type: "goblin", lane: "left", delay: 18 },
//     { type: "goblin", lane: "left", delay: 21 },
//     { type: "orc", lane: "center", delay: 12 },
//     { type: "goblin", lane: "left", delay: 25 },
//     { type: "goblin", lane: "left", delay: 28 },
//     { type: "goblin", lane: "left", delay: 29 },
//     { type: "goblin", lane: "left", delay: 32 },
//     { type: "goblin", lane: "left", delay: 35 },
//     { type: "orc", lane: "center", delay: 38 },

//   ],
//   // 2
//   [
//     { type: "goblin", lane: "left", delay: 0 },
//     { type: "goblin", lane: "right", delay: 8 },
//     { type: "orc", lane: "center", delay: 12 },
//   ],
//   // 3
//   [
//     { type: "goblin", lane: "left", delay: 0 },
//     { type: "goblin", lane: "left", delay: 10 },
//     { type: "goblin", lane: "right", delay: 12 },
//     { type: "orc", lane: "center", delay: 9 },
//   ],
//   // 4
//   [
//     { type: "goblin", lane: "right", delay: 2 },
//     { type: "goblin", lane: "left", delay: 4 },
//     { type: "goblin", lane: "right", delay: 12 },
//     { type: "orc", lane: "center", delay: 3 },
//     { type: "orc", lane: "center", delay: 9 },
//     { type: "orc", lane: "center", delay: 12 },
//   ],
//   // 5
//   [
//     { type: "goblin", lane: "left", delay: 0 },
//     { type: "goblin", lane: "right", delay: 2 },
//     { type: "goblin", lane: "left", delay: 4 },
//     { type: "goblin", lane: "right", delay: 8 },
//     { type: "goblin", lane: "left", delay: 10 },
//     { type: "goblin", lane: "right", delay: 12 },
//     { type: "orc", lane: "center", delay: 3 },
//     { type: "orc", lane: "center", delay: 6 },
//     { type: "orc", lane: "center", delay: 9 },
//     { type: "orc", lane: "center", delay: 12 },
//   ],
//   // 6
//   [
//     { type: "goblin", lane: "left", delay: 0 },
//     { type: "goblin", lane: "right", delay: 2 },
//     { type: "goblin", lane: "left", delay: 4 },
//     { type: "goblin", lane: "right", delay: 8 },
//     { type: "goblin", lane: "left", delay: 10 },
//     { type: "goblin", lane: "right", delay: 12 },
//     { type: "orc", lane: "center", delay: 3 },
//     { type: "orc", lane: "center", delay: 6 },
//     { type: "orc", lane: "center", delay: 9 },
//     { type: "orc", lane: "center", delay: 12 },
//   ],
//   // 7
//   [
//     { type: "goblin", lane: "left", delay: 0 },
//     { type: "goblin", lane: "right", delay: 2 },
//     { type: "goblin", lane: "left", delay: 4 },
//     { type: "goblin", lane: "right", delay: 8 },
//     { type: "goblin", lane: "left", delay: 10 },
//     { type: "goblin", lane: "right", delay: 12 },
//     { type: "orc", lane: "center", delay: 3 },
//     { type: "orc", lane: "center", delay: 6 },
//     { type: "orc", lane: "center", delay: 9 },
//     { type: "orc", lane: "center", delay: 12 },
//   ],
//   // 8
//   [
//     { type: "goblin", lane: "left", delay: 0 },
//     { type: "goblin", lane: "right", delay: 2 },
//     { type: "goblin", lane: "left", delay: 4 },
//     { type: "goblin", lane: "right", delay: 8 },
//     { type: "goblin", lane: "left", delay: 10 },
//     { type: "goblin", lane: "right", delay: 12 },
//     { type: "orc", lane: "center", delay: 3 },
//     { type: "orc", lane: "center", delay: 6 },
//     { type: "orc", lane: "center", delay: 9 },
//     { type: "orc", lane: "center", delay: 12 },
//   ],
// ],
