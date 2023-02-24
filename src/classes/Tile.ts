export interface Pos {
  x: number;
  y: number;
}

export class Tile {
  #id: string;
  #index: number;
  #pos: Pos;
  #type: string;
  connected = false;
  hasTower = false;
  isBlocked = false;
  isStartingPoint = false;
  isEnemyEntrance = false;
  isVisible = false;

  constructor(id: string, index: number, pos: Pos, type: string) {
    this.#id = id;
    this.#index = index;
    this.#pos = pos;
    this.#type = type;
  }

  focus() {}
  blur() {}
}
