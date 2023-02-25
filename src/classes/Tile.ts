import { TILE_WIDTH } from "../lib/constants";
import { tiles_g } from "../lib/DOM_elements";
import { RingMenuType } from "./RingMenu";

export interface Pos {
  x: number;
  y: number;
}

export interface TileExits {
  left: Pos;
  center: Pos;
  right: Pos;
}

export type EnemyLane = "left" | "center" | "right";

export type TileType =
  | "grass"
  | "dirt"
  | "rock"
  | "lava"
  | "grass-path-end-B"
  | "grass-path-end-L"
  | "grass-path-end-R"
  | "grass-path-TB"
  | "grass-path-LR"
  | "grass-path-RL"
  | "grass-path-TL"
  | "grass-path-TR"
  | "grass-path-LB"
  | "grass-path-RB"
  | "dirt-path-end-B"
  | "dirt-path-end-L"
  | "dirt-path-end-R"
  | "dirt-path-TB"
  | "dirt-path-LR"
  | "dirt-path-RL"
  | "dirt-path-TL"
  | "dirt-path-TR"
  | "dirt-path-LB"
  | "dirt-path-RB";

enum TileAssets {
  grass = "/assets/tiles/tile_grass.webp",
  dirt = "/assets/tiles/tile_dirt.webp",
  rock = "/assets/tiles/tile_rock.webp",
  lava = "/assets/tiles/tile_lava.webp",
  "grass-path-end-B" = "/assets/tiles/tile_grass_path_end_B.webp",
  "grass-path-end-L" = "/assets/tiles/tile_grass_path_end_L.webp",
  "grass-path-end-R" = "/assets/tiles/tile_grass_path_end_R.webp",
  "grass-path-TB" = "/assets/tiles/tile_grass_path_TB.webp",
  "grass-path-LR" = "/assets/tiles/tile_grass_path_LR.webp",
  "grass-path-RL" = "/assets/tiles/tile_grass_path_LR.webp",
  "grass-path-TL" = "/assets/tiles/tile_grass_path_TL.webp",
  "grass-path-TR" = "/assets/tiles/tile_grass_path_TR.webp",
  "grass-path-LB" = "/assets/tiles/tile_grass_path_LB.webp",
  "grass-path-RB" = "/assets/tiles/tile_grass_path_RB.webp",
  "dirt-path-end-B" = "/assets/tiles/tile_dirt_path_end_B.webp",
  "dirt-path-end-L" = "/assets/tiles/tile_dirt_path_end_L.webp",
  "dirt-path-end-R" = "/assets/tiles/tile_dirt_path_end_R.webp",
  "dirt-path-TB" = "/assets/tiles/tile_dirt_path_TB.webp",
  "dirt-path-LR" = "/assets/tiles/tile_dirt_path_LR.webp",
  "dirt-path-RL" = "/assets/tiles/tile_dirt_path_LR.webp",
  "dirt-path-TL" = "/assets/tiles/tile_dirt_path_TL.webp",
  "dirt-path-TR" = "/assets/tiles/tile_dirt_path_TR.webp",
  "dirt-path-LB" = "/assets/tiles/tile_dirt_path_LB.webp",
  "dirt-path-RB" = "/assets/tiles/tile_dirt_path_RB.webp",
}

export class Tile {
  #id: string;
  #index: number;
  #pos: Pos;
  #type: TileType;
  #shape: SVGRectElement;
  #defs: SVGDefsElement;
  #pattern: SVGPatternElement;
  #image: SVGImageElement;
  #connected = false;
  hasTower = false;
  isBlocked = false;
  isStartingPoint = false;
  isEnemyEntrance = false;
  #isVisible = true;
  exits: TileExits | null = null;

  constructor(
    id: string,
    index: number,
    pos: Pos,
    type: TileType,
    waveline: number,
    isStartingPoint?: boolean,
    prevTile?: Tile
  ) {
    this.#id = id;
    this.#index = index;
    this.#pos = pos;
    this.#type = type;

    this.isBlocked = type === "lava";
    this.isStartingPoint = isStartingPoint || false;
    this.#isVisible = this.pos.y / TILE_WIDTH < waveline;

    this.#shape = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    this.#defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    this.#pattern = document.createElementNS("http://www.w3.org/2000/svg", "pattern");
    this.#image = document.createElementNS("http://www.w3.org/2000/svg", "image");

    this.#drawTile();
    this.#attachEvents();
    if (prevTile || isStartingPoint) {
      this.exits = this.getTileExits(prevTile);
    }
  }

  #drawTile() {
    const patternId = `_tile-pattern-${this.id}`;

    this.#shape.setAttribute("id", this.id);
    this.#shape.setAttribute("data-entity", "tile");
    this.#shape.setAttribute("data-index", String(this.index));
    this.#shape.setAttribute("x", String(this.pos.x));
    this.#shape.setAttribute("y", String(this.pos.y));
    this.#shape.setAttribute("height", TILE_WIDTH + "px");
    this.#shape.setAttribute("width", TILE_WIDTH + "px");
    this.#shape.setAttribute("opacity", this.#isVisible ? "1" : "0.4");
    this.#shape.setAttribute("fill", `url(#${patternId})`);
    // this.#shape.setAttribute("style", `filter: brightness:(${this.isVisible ? "1" : "1.5"});`);

    this.#defs.setAttribute("id", `defs-${this.id}`);
    this.#defs.setAttribute("class", "defs tile-defs");
    this.#pattern.setAttribute("id", patternId);
    this.#pattern.setAttribute("width", "1");
    this.#pattern.setAttribute("height", "1");
    this.#image.setAttribute("id", `image-${this.id}`);
    this.#image.setAttribute("href", TileAssets[this.type]);
    this.#image.setAttribute("height", TILE_WIDTH + "px");
    this.#image.setAttribute("width", TILE_WIDTH + "px");

    this.#defs.append(this.#pattern);
    this.#pattern.append(this.#image);
    tiles_g.append(this.#defs);
    tiles_g.append(this.#shape);
  }

  #attachEvents() {
    this.#shape.onpointerup = (e: PointerEvent) => {
      const tileClick = new CustomEvent("tile-clicked", { detail: this });
      document.dispatchEvent(tileClick);
    };
  }

  focus() {
    this.#shape.setAttribute("opacity", "0.6");
    // this.#shape.setAttribute("style", `filter: drop-shadow(0 0 12px #88f);`);
    const showRingMenu = new CustomEvent("show-ring-menu", { detail: this });
    document.dispatchEvent(showRingMenu);
  }

  blur() {
    this.#shape.setAttribute("opacity", this.#isVisible ? "1" : "0.4");

    // this.#shape.setAttribute("style", `filter: drop-shadow(0 0 0 #88f);`);
    const hideRingMenu = new CustomEvent("hide-ring-menu", { detail: null });
    document.dispatchEvent(hideRingMenu);
    // let waveLine = G.waveNumber + STAGES_AND_WAVES[G.stageNumber].stage.firstWaveAtRow;
    // const afterWaveLineAndInvisible = row >= waveLine && !this.visible && !this.enemyEntrance;
    // this.shape.setAttribute("opacity", afterWaveLineAndInvisible ? 0.4 : 1);
    // this.shape.setAttribute("style", `filter: drop-shadow(0 0 0 #88f);`);
  }

  canBecomePath() {
    return (this.type === "grass" || this.type === "dirt") && !this.hasTower;
  }

  getMenuType = (): RingMenuType | null => {
    if (this.type.includes("path") && this.connected) {
      return "traps";
    }
    if (this.type.includes("path") && !this.connected) {
      return "newPath";
    }
    if (this.hasTower) {
      return "towerDetail";
    }
    if (!this.isBlocked && this.#isVisible) {
      return "newTower";
    }
    return null;
  };

  getTileExits(prevTile?: Tile) {
    // console.log("getTileExits", { tile });

    if (this.isStartingPoint || !prevTile) {
      const left = { x: this.pos.x + TILE_WIDTH * 0.25, y: 0 };
      const center = { x: this.pos.x + TILE_WIDTH * 0.5, y: 0 };
      const right = { x: this.pos.x + TILE_WIDTH * 0.75, y: 0 };
      // G.tileChain.push({ ...tile, exits });
      return { left, center, right };
    }

    // const prevTile = G.tileChain.at(-1);

    const left = { x: 0, y: 0 };
    const center = { x: 0, y: 0 };
    const right = { x: 0, y: 0 };

    // newTile below
    if (prevTile.pos.y < this.pos.y) {
      left.x = this.pos.x + TILE_WIDTH * 0.25;
      left.y = this.pos.y;
      center.x = this.pos.x + TILE_WIDTH * 0.5;
      center.y = this.pos.y;
      right.x = this.pos.x + TILE_WIDTH * 0.75;
      right.y = this.pos.y;
    }

    // newTile to the left
    if (prevTile.pos.x > this.pos.x) {
      left.x = this.pos.x + TILE_WIDTH;
      left.y = this.pos.y + TILE_WIDTH * 0.25;
      center.x = this.pos.x + TILE_WIDTH;
      center.y = this.pos.y + TILE_WIDTH * 0.5;
      right.x = this.pos.x + TILE_WIDTH;
      right.y = this.pos.y + TILE_WIDTH * 0.75;
    }

    // newTile to the right
    if (prevTile.pos.x < this.pos.x) {
      left.x = this.pos.x;
      left.y = this.pos.y + TILE_WIDTH * 0.75;
      center.x = this.pos.x;
      center.y = this.pos.y + TILE_WIDTH * 0.5;
      right.x = this.pos.x;
      right.y = this.pos.y + TILE_WIDTH * 0.25;
    }
    // console.log("getTileExits", { prevTile, left, center, right });
    return { left, center, right };
  }

  turnIntoPathSegment(nextTile: Tile) {
    // console.log("becomePathSegment"), { curr: this, nextTile };
    this.#connected = true;

    const vegetation = this.type.split("-")[0];
    const rawPrevDir = this.type.split("-end-")[1] as "B" | "L" | "R";
    const nextDir = nextTile.type.split("-end-")[1] as "B" | "L" | "R";

    if (!nextDir || !rawPrevDir || (vegetation !== "grass" && vegetation !== "dirt"))
      throw Error("becomePathSegment needs to be called after becomePathEnd, we need info from the next path here");

    const translatePrevDir = (rawPrevDir: "B" | "L" | "R") => {
      switch (rawPrevDir) {
        case "B":
          return "T";
        case "L":
          return "R";
        case "R":
          return "L";
      }
    };

    const prevDir = translatePrevDir(rawPrevDir);

    // console.log({ rawPrevDir, prevDir, nextDir });

    this.#type = `${vegetation}-path-${prevDir}${nextDir}` as TileType;
    this.#image.setAttribute("href", TileAssets[this.type]);
  }

  turnIntoPathEnd(prevTile: Tile) {
    // console.log("becomePathEnd", { curr: this, prevTile });

    const getDirection = (index: number) => {
      if (index - this.index === 1) return "L";
      if (index - this.index === -1) return "R";
      else return "B";
    };

    if (this.type !== "grass" && this.type !== "dirt") {
      throw Error("can't transform a non dirt/grass tile into a path");
    }

    // determine tile type (base + path + direction)
    this.#type = `${this.type}-path-end-${getDirection(prevTile.index)}`;
    this.exits = this.getTileExits(prevTile);
    // change href
    this.#image.setAttribute("href", TileAssets[this.type]);
  }

  setVisibility(value: boolean) {
    this.#isVisible = value;
    this.#shape.setAttribute("opacity", this.#isVisible ? "1" : "0.4");
  }

  get id() {
    return this.#id;
  }
  get pos() {
    return this.#pos;
  }
  get index() {
    return this.#index;
  }
  get type() {
    return this.#type;
  }
  get connected() {
    return this.#connected;
  }
  get shape() {
    return this.#shape;
  }
}
