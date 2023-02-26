import { ENEMIES, TILE_WIDTH } from "../lib/constants";
import { enemies_g, enemy_lane_paths } from "../lib/DOM_elements";
import { generateUUID, getAngle } from "../lib/helpers";
import { EnemyLane, Pos } from "./Tile";

export type EnemyType = "goblin" | "orc" | "troll" | "dragon";
export class Enemy {
  #type: EnemyType;
  #id: string;
  #lane: SVGPathElement;
  #shape: SVGCircleElement;
  #gold: number;
  #text: SVGTextElement;
  #hp: number;
  #fill: string;
  #size: number;
  #spawned = false;
  delay: number;
  #pos: Pos;
  done = false;
  rotation = -90;
  percProgress = 0;
  speed: number;
  progress = 0;
  constructor(pos: Pos, type: EnemyType, lane: EnemyLane, delay: number) {
    const { hp, gold, speed, fill, size } = ENEMIES[type];

    this.#id = `${type}-${generateUUID(16)}`;
    this.#type = type;
    this.#lane = enemy_lane_paths[lane];
    this.#pos = pos;
    this.delay = delay;
    this.#hp = hp;
    this.#gold = gold;
    this.speed = speed;
    this.#fill = fill;
    this.#size = size;
    
    // this.#shape = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    this.#shape = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    this.#text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    this.#shape.setAttribute("id", this.#id);

    this.#draw();
  }

  get id() {
    return this.#id;
  }
  get hp() {
    return this.#hp;
  }
  get type() {
    return this.#type;
  }
  get fill() {
    return this.#fill;
  }
  get gold() {
    return this.#gold;
  }
  get spawned() {
    return this.#spawned;
  }

  #draw() {
    this.#shape.setAttribute("points", this.getPoints());
    this.#shape.setAttribute("data-hp", String(this.hp));
    this.#shape.setAttribute("data-entity", "enemy");
    this.#shape.setAttribute("fill", this.fill);
    this.#shape.setAttribute("r", String(this.#size));
    this.#shape.setAttribute("cx", String(this.#pos.x));
    this.#shape.setAttribute("cy", String(this.#pos.y));

    this.#text.setAttribute("x", String(this.#pos.x));
    this.#text.setAttribute("y", String(this.#pos.y + 15));
    this.#text.textContent = this.hp.toFixed(0);

    this.#shape.setAttribute("display", "none");
    this.#text.setAttribute("display", "none");


    enemies_g.append(this.#shape);
    enemies_g.append(this.#text);
  }

  move() {
    const prog = this.#lane.getTotalLength() - (this.#lane.getTotalLength() - (this.progress + this.speed * 0.5));
    const { x, y } = this.#lane.getPointAtLength(this.#lane.getTotalLength() - prog);

    // update enemies' progress
    this.progress = prog;
    this.percProgress = (prog / this.#lane.getTotalLength()) * 100;
    this.#pos.x = x;
    this.#pos.y = y;

    this.#shape.setAttribute("cx", String(this.#pos.x));
    this.#shape.setAttribute("cy", String(this.#pos.y));

    this.#text.setAttribute("x", String(this.#pos.x));
    this.#text.setAttribute("y", String(this.#pos.y));
    this.#text.textContent = this.hp.toFixed(0);
  }

  getPoints() {
    const { x, y } = this.#pos;
    const points = [
      { x: x + this.#size * 2, y },
      { x: x - this.#size, y: y + this.#size },
      { x: x - this.#size, y: y - this.#size },
      { x: x + this.#size * 2, y },
    ];
    return points.map(p => `${parseInt(String(p.x))} ${parseInt(String(p.y))} `).join("");
  }

  spawn() {
    this.#shape.setAttribute("display", "block");
    this.#text.setAttribute("display", "block");
    this.#spawned = true;
  }

  die() {
    this.done = true;
    this.#text.remove();
    this.#shape.remove();
  }

  finish() {
    this.done = true;
    this.#text.remove();
    this.#shape.remove();
  }
}
