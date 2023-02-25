// import { svg } from "./dom-selects";
import { WaveDefinition } from "../classes/WaveDefinition";

export const FPS = 15;
export const EXPLOSION_RADIUS = 30;

export const initialGold = 200;
export const initialEmeralds = 50;
export const initialCastleHP = 10;

// export const sceneRect = svg.getBoundingClientRect();
export const TILE_WIDTH = 100;
export const MARGIN = TILE_WIDTH / 2;

export const RING_MENU_ICONS = {
  traps: [
    {
      id: "mine-trap-icon",
      type: "mine",
      x: TILE_WIDTH * 0.2, // 20
      y: TILE_WIDTH * 0.25, // 25
      color: "orangered",
      img: "/assets/icons/bullseye.svg",
    },
    {
      id: "slime-trap-icon",
      type: "slime",
      x: TILE_WIDTH * 0.2, // 20
      y: TILE_WIDTH * 1.25, // 125
      color: "#22b165",
      img: "/assets/icons/bottle-droplet.svg",
    },
    {
      id: "poison-trap-icon",
      type: "poison",
      x: TILE_WIDTH * 1.3, // 130,
      y: TILE_WIDTH * 0.25, // 25,
      color: "lightgreen",
      img: "/assets/icons/flask.svg",
    },
    {
      id: "ice-trap-icon",
      type: "ice",
      x: TILE_WIDTH * 1.3, // 130,
      y: TILE_WIDTH * 1.25, // 125,
      color: "lightblue",
      img: "/assets/icons/icicles.svg",
    },
  ],
  newPath: [
    {
      id: "shovel-right-icon",
      type: "shovel-right",
      x: TILE_WIDTH * 1.5, // 150,
      y: TILE_WIDTH * 0.75, // 75,
      color: "red",
      img: "/assets/icons/shovel.svg",
    },
    {
      id: "shovel-left-icon",
      type: "shovel-left",
      x: 0,
      y: TILE_WIDTH * 0.75, // 75,
      color: "red",
      img: "/assets/icons/shovel.svg",
    },
    {
      id: "shovel-bottom-icon",
      type: "shovel-bottom",
      x: TILE_WIDTH * 0.75, // 75,
      y: TILE_WIDTH * 1.5, // 150,
      color: "red",
      img: "/assets/icons/shovel.svg",
    },
  ],
  towerDetail: [
    {
      id: "upgrade-icon",
      type: "upgrade",
      x: TILE_WIDTH * 0.75, // 75,
      y: 0,
      color: "#7dfd90",
      img: "/assets/icons/upgrade.svg",
    },
    {
      id: "sell-icon",
      type: "sell",
      x: TILE_WIDTH * 0.1, // 10,
      y: TILE_WIDTH * 1.15, // 115,
      color: "gold",
      img: "/assets/icons/sack-dollar.svg",
    },
    {
      id: "info-icon",
      type: "info",
      x: TILE_WIDTH * 1.4, // 140,
      y: TILE_WIDTH * 1.15, // 115,
      color: "#ddd",
      img: "/assets/icons/book.svg",
    },
  ],
  newTower: [
    {
      id: "fire-tower-add-icon",
      type: "fire",
      x: TILE_WIDTH * 0.75, // 75,
      y: 0,
      color: "red",
      img: "/assets/icons/fire.svg",
    },
    {
      id: "lightning-tower-add-icon",
      type: "lightning",
      x: TILE_WIDTH * 1.5, // 150,
      y: TILE_WIDTH * 0.75, // 75,
      color: "gold",
      img: "/assets/icons/bolt.svg",
    },
    {
      id: "ice-tower-add-icon",
      type: "ice",
      x: 0,
      y: TILE_WIDTH * 0.75, // 75,
      color: "dodgerblue",
      img: "/assets/icons/snowflake.svg",
    },
    {
      id: "earth-tower-add-icon",
      type: "earth",
      x: TILE_WIDTH * 0.75, // 75,
      y: TILE_WIDTH * 1.5, // 150,
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
    fill: "purple",
    size: 15,
  },
};

export const STAGES_AND_WAVES = {
  1: {
    blockedTiles: {
      // blockedTiles[row][col]
      5: [2],
      6: [3],
      7: [2, 3],
    },
    wallTiles: {
      0: [3],
      1: [1, 3],
      3: [0],
    },
    waves: [
      new WaveDefinition()
        .defEnemySeq("goblin", "center", 5, 5)
        .defEnemySeq("goblin", "center", 5, 10)
        .defEnemySeq("goblin", "left", 2, 10, 4)
        .build(),
      new WaveDefinition()
        .defEnemySeq("goblin", "center", 6, 5, 2)
        .defEnemySeq("goblin", "right", 2, 12, 2)
        .defEnemySeq("goblin", "left", 2, 12, 2)
        .defEnemySeq("orc", "center", 3, 0, 12)
        .build(),
      new WaveDefinition()
        .defEnemySeq("goblin", "left", 6, 5)
        .defEnemySeq("goblin", "right", 6, 5, 1)
        .defEnemySeq("orc", "center", 2, 12, 12)
        .defEnemySeq("orc", "left", 1, 16)
        .defEnemySeq("orc", "right", 1, 16)
        .build(),
      new WaveDefinition()
        .defEnemySeq("goblin", "left", 6, 5)
        .defEnemySeq("goblin", "right", 6, 5, 1)
        .defEnemySeq("orc", "center", 6, 10, 5)
        .defEnemySeq("orc", "left", 3, 16, 3)
        .defEnemySeq("orc", "right", 3, 16, 3)
        .build(),
    ],
    stage: {
      number: 1,
      name: "cozy hills",
      firstWaveAtRow: 4,
      cols: 4,
      entrypoint: 0,
      baseTile: "grass",
      rows: 0,
    },
  },
  2: {
    stage: {
      number: 2,
      name: "Guadalajara road",
      firstWaveAtRow: 2,
      entrypoint: 2,
      cols: 5,
      baseTile: "dirt",
      rows: 0,
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
    waves: [
      new WaveDefinition().defEnemySeq("goblin", "left", 10, 0, 3).defEnemySeq("goblin", "center", 10, 10, 3).build(),
      new WaveDefinition().defEnemySeq("goblin", "center", 8, 5).defEnemySeq("orc", "center", 6, 12, 2).build(),
      new WaveDefinition()
        .defEnemySeq("goblin", "left", 6, 5)
        .defEnemySeq("goblin", "right", 6, 1, 5)
        .defEnemySeq("dragon", "center", 1, 5)
        .defEnemySeq("orc", "center", 2, 12, 12)
        .build(),
      new WaveDefinition()
        .defEnemySeq("dragon", "center", 2, 10)
        .defEnemySeq("goblin", "left", 6, 5)
        .defEnemySeq("goblin", "right", 6, 1, 5)
        .defEnemySeq("orc", "center", 2, 12, 12)
        .build(),
    ],
  },
  3: {
    stage: {
      number: 3,
      name: "Urca sunset",
      firstWaveAtRow: 3,
      entrypoint: 1,
      cols: 3,
      baseTile: "grass",
      rows: 0,
    },
    blockedTiles: {},
    wallTiles: {
      2: [1],
      4: [0, 2],
      6: [1, 2],
    },
    waves: [
      new WaveDefinition()
        .defEnemySeq("dragon", "center", 1, 0),
        // .defEnemySeq("dragon", "center", 1, 0)
        // .defEnemySeq("goblin", "left", 1, 0)
      // .defEnemySeq("goblin", "right", 6, 0, 5),

      // .defEnemySeq("dragon", "center", 1, 0)
      // .defEnemySeq("goblin", "left", 6, 0, 5)
      // .defEnemySeq("goblin", "right", 6, 0, 5),

      new WaveDefinition()
        .defEnemySeq("goblin", "left", 6, 0, 5)
        .defEnemySeq("goblin", "right", 6, 2.5, 5)
        .defEnemySeq("orc", "center", 2, 12, 12)
        .build(),
      new WaveDefinition()
        .defEnemySeq("goblin", "left", 10, 0)
        .defEnemySeq("goblin", "right", 10, 10)
        .defEnemySeq("goblin", "center", 10, 20)
        .build(),
      new WaveDefinition()
        .defEnemySeq("dragon", "center", 2, 10)
        .defEnemySeq("goblin", "left", 6, 0, 5)
        .defEnemySeq("goblin", "right", 6, 1, 5)
        .defEnemySeq("orc", "center", 2, 12, 12)
        .build(),
      new WaveDefinition()
        .defEnemySeq("goblin", "left", 10, 0)
        .defEnemySeq("goblin", "right", 10, 10)
        .defEnemySeq("goblin", "center", 10, 20)
        .build(),
      new WaveDefinition()
        .defEnemySeq("goblin", "left", 6, 0, 5)
        .defEnemySeq("goblin", "right", 6, 1, 5)
        .defEnemySeq("orc", "center", 2, 12, 12)
        .defEnemySeq("dragon", "center", 2, 10, 6)
        .build(),
    ],
  },
  4: {
    stage: {
      number: 4,
      name: "Lapa boulevard",
      firstWaveAtRow: 3,
      entrypoint: 3,
      cols: 4,
      baseTile: "dirt",
      rows: 0,
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
    waves: [
      new WaveDefinition()
        .defEnemySeq("goblin", "left", 6, 0, 5)
        .defEnemySeq("goblin", "right", 6, 2.5, 5)
        .defEnemySeq("orc", "center", 2, 12, 12)
        .build(),
      new WaveDefinition()
        .defEnemySeq("goblin", "left", 6, 0, 5)
        .defEnemySeq("goblin", "right", 6, 1, 5)
        .defEnemySeq("orc", "center", 2, 12, 12)
        .build(),
      new WaveDefinition()
        .defEnemySeq("dragon", "center", 1, 10)
        .defEnemySeq("goblin", "left", 6, 0, 5)
        .defEnemySeq("goblin", "right", 6, 1, 5)
        .defEnemySeq("orc", "center", 2, 12, 12)
        .build(),
      new WaveDefinition()
        .defEnemySeq("goblin", "left", 6, 0, 5)
        .defEnemySeq("goblin", "right", 6, 1, 5)
        .defEnemySeq("orc", "center", 2, 12, 12)
        .defEnemySeq("dragon", "center", 2, 10, 20)
        .build(),
      new WaveDefinition()
        .defEnemySeq("goblin", "left", 6, 0, 5)
        .defEnemySeq("goblin", "right", 6, 1, 5)
        .defEnemySeq("orc", "center", 2, 12, 12)
        .defEnemySeq("dragon", "center", 3, 10, 10)
        .build(),
    ],
  },
  5: {
    stage: {
      number: 5,
      name: "Piemont Square",
      firstWaveAtRow: 2,
      entrypoint: 1,
      cols: 3,
      baseTile: "grass",
      rows: 0,
    },
    blockedTiles: {},
    wallTiles: {
      2: [0, 1],
      4: [1, 2],
    },
    waves: [
      new WaveDefinition()
        .defEnemySeq("goblin", "left", 6, 0, 5)
        .defEnemySeq("goblin", "right", 6, 2.5, 5)
        .defEnemySeq("orc", "center", 2, 12, 12)
        .build(),
      new WaveDefinition()
        .defEnemySeq("goblin", "left", 6, 0, 5)
        .defEnemySeq("goblin", "right", 6, 1, 5)
        .defEnemySeq("orc", "center", 2, 12, 12)
        .build(),
      new WaveDefinition()
        .defEnemySeq("dragon", "center", 1, 10)
        .defEnemySeq("goblin", "left", 6, 0, 5)
        .defEnemySeq("goblin", "right", 6, 1, 5)
        .defEnemySeq("orc", "center", 2, 12, 12)
        .build(),
      new WaveDefinition()
        .defEnemySeq("goblin", "left", 6, 0, 5)
        .defEnemySeq("goblin", "right", 6, 1, 5)
        .defEnemySeq("orc", "center", 2, 12, 12)
        .defEnemySeq("dragon", "center", 2, 10, 20)
        .build(),
      new WaveDefinition()
        .defEnemySeq("goblin", "left", 6, 0, 5)
        .defEnemySeq("goblin", "right", 6, 1, 5)
        .defEnemySeq("orc", "center", 2, 12, 12)
        .defEnemySeq("dragon", "center", 3, 10, 10)
        .build(),
      new WaveDefinition()
        .defEnemySeq("goblin", "left", 6, 0, 5)
        .defEnemySeq("goblin", "right", 6, 2, 5)
        .defEnemySeq("orc", "center", 2, 12, 12)
        .defEnemySeq("troll", "left", 3, 0, 12)
        .defEnemySeq("troll", "right", 3, 0, 12)
        .defEnemySeq("dragon", "center", 4, 10, 10)
        .build(),
    ],
  },
};

for (const [index, level] of Object.entries(STAGES_AND_WAVES)) {
  const i = Number(index) as keyof typeof STAGES_AND_WAVES;
  // console.log(i, level);
  STAGES_AND_WAVES[i].stage.rows = level.stage.firstWaveAtRow + level.waves.length;
}
