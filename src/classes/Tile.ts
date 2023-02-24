import { TILE_WIDTH } from "../lib/constants";
import { scene } from "../lib/DOM_elements";

export interface Pos {
  x: number;
  y: number;
}

export type TileType =
  | "grass"
  | "dirt"
  | "rock"
  | "lava"
  | "grass-path-initial"
  | "grass-path-TB"
  | "grass-path-LR"
  | "grass-path-TL"
  | "grass-path-TR"
  | "grass-path-LB"
  | "grass-path-RB"
  | "dirt-path-initial"
  | "dirt-path-TB"
  | "dirt-path-LR"
  | "dirt-path-TL"
  | "dirt-path-TR"
  | "dirt-path-LB"
  | "dirt-path-RB";

enum TileAssets {
  grass = "/assets/tiles/tile_grass.webp",
  dirt = "/assets/tiles/tile_dirt.webp",
  rock = "/assets/tiles/tile_rock.webp",
  lava = "/assets/tiles/tile_lava.webp",
  "grass-path-initial" = "/assets/tiles/tile_grass_path_initial.webp",
  "grass-path-TB" = "/assets/tiles/tile_grass_path_TB.webp",
  "grass-path-LR" = "/assets/tiles/tile_grass_path_LR.webp",
  "grass-path-TL" = "/assets/tiles/tile_grass_path_TL.webp",
  "grass-path-TR" = "/assets/tiles/tile_grass_path_TR.webp",
  "grass-path-LB" = "/assets/tiles/tile_grass_path_LB.webp",
  "grass-path-RB" = "/assets/tiles/tile_grass_path_RB.webp",
  "dirt-path-initial" = "/assets/tiles/tile_dirt_path_initial.webp",
  "dirt-path-TB" = "/assets/tiles/tile_dirt_path_TB.webp",
  "dirt-path-LR" = "/assets/tiles/tile_dirt_path_LR.webp",
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
  connected = false;
  hasTower = false;
  isBlocked = false;
  isStartingPoint = false;
  isEnemyEntrance = false;
  isVisible = false;

  constructor(id: string, index: number, pos: Pos, type: TileType) {
    this.#id = id;
    this.#index = index;
    this.#pos = pos;
    this.#type = type;

    this.#drawTile();
  }

  #drawTile() {
    const shape = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    const pattern = document.createElementNS("http://www.w3.org/2000/svg", "pattern");
    const image = document.createElementNS("http://www.w3.org/2000/svg", "image");

    const patternId = `_tile-pattern-${this.#id}`;

    shape.setAttribute("id", this.#id);
    shape.setAttribute("data-entity", "tile");
    shape.setAttribute("data-index", String(this.#index));
    shape.setAttribute("x", String(this.#pos.x));
    shape.setAttribute("y", String(this.#pos.y));
    shape.setAttribute("height", TILE_WIDTH + "px");
    shape.setAttribute("width", TILE_WIDTH + "px");
    shape.setAttribute("opacity", "1");
    shape.setAttribute("fill", `url(#${patternId})`);

    defs.setAttribute("id", `defs-${this.#id}`);
    defs.setAttribute("class", "defs tile-defs");
    pattern.setAttribute("id", patternId);
    pattern.setAttribute("width", "1");
    pattern.setAttribute("height", "1");
    image.setAttribute("id", `image-${this.id}`);
    image.setAttribute("href", TileAssets[this.type]);
    image.setAttribute("height", TILE_WIDTH + "px");
    image.setAttribute("width", TILE_WIDTH + "px");

    defs.append(pattern);
    pattern.append(image);
    scene.append(defs);
    scene.append(shape);
  }

  focus() {}
  blur() {}

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
}
