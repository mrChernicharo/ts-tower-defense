import { STAGES_AND_WAVES, TILE_WIDTH } from "../lib/constants";
import { scene, stage_name_span, stage_number_span, svg } from "../lib/DOM_elements";
import { Tile, TileType } from "./Tile";

type StageInfo = typeof STAGES_AND_WAVES[keyof typeof STAGES_AND_WAVES];

export class Game {
  // frameId = 0;
  // tick = 0;
  // clock = 0;
  // mouse = { x: null; y: null };
  // lastClick = { x: null; y: null };
  // enemies = [];
  // towers = [];
  // bullets = [];
  #tiles: Tile[];
  // bulletCount = 0;
  // tileChain = [];
  // selectedTile = null;
  // lastSelectedTile = null;
  // isPlaying = false;
  // inBattle = false;
  // towerPreviewActive = false;
  #stageName: string;
  #stageNumber: number;
  #rows: number;
  #cols: number;
  #baseTile: string;
  #blockedTiles: any;
  #wallTiles: any;
  #entrypoint: any;
  #firstWaveAtRow: number;
  // waveNumber = null;
  // wavesTimes = [{ start: 0; end: null }];
  // gameSpeed = 2;

  constructor(stageInfo: StageInfo) {
    console.log({ stageInfo });
    const { stage, blockedTiles, wallTiles, waves } = stageInfo;
    const { name, number, cols, rows, baseTile, entrypoint, firstWaveAtRow } = stage;

    this.#stageName = name;
    this.#stageNumber = number;
    this.#cols = cols;
    this.#rows = rows;

    this.#baseTile = baseTile;
    this.#entrypoint = entrypoint;
    this.#firstWaveAtRow = firstWaveAtRow;

    this.#wallTiles = wallTiles;
    this.#blockedTiles = blockedTiles;

    stage_number_span.textContent = `Stage ${this.#stageNumber}`;
    stage_name_span.textContent = `${this.#stageName}`;

    this.#tiles = this.#createGrid();
    this.#appendEventListeners();
  }

  #createGrid() {
    // set scene size
    svg.setAttribute("width", String((this.#cols + 1) * TILE_WIDTH));
    svg.setAttribute("height", String((this.#rows + 1) * TILE_WIDTH));

    scene.setAttribute("style", `transform: translate(${TILE_WIDTH / 2}px, ${TILE_WIDTH / 2}px)`);

    const isInitialPath = (row: number, col: number) => row == 0 && col == this.#entrypoint;

    const isBlocked = (row: number, col: number) =>
      Boolean(this.#blockedTiles[row] && this.#blockedTiles[row].includes(col));

    const isWall = (row: number, col: number) => Boolean(this.#wallTiles[row] && this.#wallTiles[row].includes(col));

    const getTileType = (isStartingPoint: boolean) => {
      if (isStartingPoint) return `${this.#baseTile}-path-initial`;
      else return this.#baseTile;
    };

    const tiles: Tile[] = [];
    for (let row of Array(this.#rows)
      .fill(null)
      .map((_, i) => i)) {
      for (let col of Array(this.#cols)
        .fill(null)
        .map((_, i) => i)) {
        const tilePos = { x: col * TILE_WIDTH, y: row * TILE_WIDTH };

        const tileId = `tile-${tilePos.y}-${tilePos.x}`;
        const tileIdx = row * this.#cols + col;

        const isStartingPoint = isInitialPath(row, col);
        const tileBlocked = isBlocked(row, col);

        const tileType = (tileBlocked ? "lava" : isWall(row, col) ? "rock" : getTileType(isStartingPoint)) as TileType;

        tiles.push(new Tile(tileId, tileIdx, tilePos, tileType));
      }
    }
    return tiles;
  }

  #appendEventListeners() {
    document.addEventListener("tile-clicked", (e: CustomEvent<Tile>) => {
      console.log(e, e.detail);
    });
  }
}
