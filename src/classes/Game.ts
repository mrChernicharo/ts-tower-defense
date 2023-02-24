import { STAGES_AND_WAVES, TILE_WIDTH } from "../lib/constants";
import { enemy_lane_paths, scene, stage_name_span, stage_number_span, svg } from "../lib/DOM_elements";
import { drawPath } from "../lib/helpers";
import { IconDirection } from "./RingMenu";
import { Pos, Tile, TileType } from "./Tile";

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
  tiles: Tile[];
  // bulletCount = 0;
  tileChain: Tile[];
  #selectedTile: Tile | null = null;
  #lastSelectedTile: Tile | null = null;
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
  #waveLine: number;
  #waveNumber = 0;
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
    this.#waveLine = this.#firstWaveAtRow;

    this.#wallTiles = wallTiles;
    this.#blockedTiles = blockedTiles;

    stage_number_span.textContent = `Stage ${this.#stageNumber}`;
    stage_name_span.textContent = `${this.#stageName}`;

    this.tiles = this.#createGrid();
    this.tileChain = [this.tiles.find(t => t.isStartingPoint)!];
    console.log(this);
    this.#appendEventListeners();
  }

  get cols() {
    return this.#cols;
  }
  get rows() {
    return this.#rows;
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
      if (isStartingPoint) return `${this.#baseTile}-path-end-B`;
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

        const newTile = new Tile(tileId, tileIdx, tilePos, tileType, this.#waveLine, isStartingPoint);

        tiles.push(newTile);
      }
    }
    return tiles;
  }

  #appendEventListeners() {
    document.addEventListener("click", (e: MouseEvent) => {
      if (!(e.target as HTMLElement).dataset.entity) {
        console.log("clicked outside", e);
        this.#lastSelectedTile = this.#selectedTile;
        // blur selected tile
        this.#selectedTile?.blur();
        this.#selectedTile = null;
        return;
      }
    });

    document.addEventListener("tile-clicked", (e: CustomEvent<Tile>) => {
      this.#lastSelectedTile = this.#selectedTile;
      this.#selectedTile = e.detail;
      // console.log("tile-clicked", { last: this.#lastSelectedTile, curr: this.#selectedTile });

      if (this.#selectedTile?.id === this.#lastSelectedTile?.id) {
        // console.log("clicked same tile!");
        // blur selected tile
        this.#selectedTile.blur();
        this.#selectedTile = null;
        return;
      }

      // console.log("clicked different tile!");
      // focus selectedTile, blur lastSelectedTile
      this.#lastSelectedTile?.blur();
      this.#selectedTile.focus();
    });
  }

  getAdjacentTile(tile: Tile, direction: IconDirection): Tile | null {
    let adj;
    switch (direction) {
      case "left":
        adj = this.tiles?.find(t => t.index === tile.index - 1 && tile.pos.x > 0);
        break;
      case "right":
        adj = this.tiles?.find(t => t.index === tile.index + 1 && tile.pos.x / TILE_WIDTH < this.cols - 1);
        break;
      case "bottom":
        adj = this.tiles?.find(t => t.index === tile.index + this.cols);
        break;
    }
    return adj || null;
  }

  createNewPath(tile: Tile, button: SVGCircleElement) {
    const direction = button.dataset.type!.split("-")[1] as IconDirection;
    const nextTile = this.getAdjacentTile(tile, direction);
    const prevTile = this.tileChain.at(-1);

    if (!prevTile || !nextTile) return;
    this.tiles[nextTile.index].becomePathEnd(prevTile);
    this.tiles[prevTile.index].becomePathSegment(nextTile);
    this.tileChain.push(nextTile);

    this.updateEnemyLanes();

    const barrierBroken =
      direction === "bottom" && nextTile.pos.y / TILE_WIDTH + 1 > this.#firstWaveAtRow + this.#waveNumber;

    if (barrierBroken) {
      this.updateTilesVisibility();
      this.#waveLine++;
    }
  }

  updateEnemyLanes() {
    const chains = this.tileChain.reduce(
      (acc: { left: Pos[]; center: Pos[]; right: Pos[] }, tile) => {
        acc.left.push(tile.exits!.left);
        acc.center.push(tile.exits!.center);
        acc.right.push(tile.exits!.right);
        return acc;
      },
      {
        left: [],
        center: [],
        right: [],
      }
    );

    enemy_lane_paths.left.setAttribute("d", drawPath(chains.left, "left"));
    enemy_lane_paths.center.setAttribute("d", drawPath(chains.center, "center"));
    enemy_lane_paths.right.setAttribute("d", drawPath(chains.right, "right"));
  }
  updateTilesVisibility() {
    const affectedTiles = this.tiles.filter(t => {
      const tileRow = Number(t.id.split("-")[1]) / TILE_WIDTH;
      return tileRow === this.#waveLine;
    });

    affectedTiles.forEach(t => {
      console.log(t);
      t.setVisibility(true);
    });
  }
}
