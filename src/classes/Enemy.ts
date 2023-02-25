import { ENEMIES } from "../lib/constants";
import { enemies_g, enemy_lane_paths } from "../lib/DOM_elements";
import { generateUUID } from "../lib/helpers";
import { EnemyLane, Pos } from "./Tile";

export type EnemyType = "goblin" | "orc" | "troll" | "dragon";
let count = 0;
export class Enemy {
  #type: EnemyType;
  #id: string;
  #lane: SVGPathElement;
  #shape: SVGPolygonElement;
  #gold: number;
  #text: SVGTextElement;
  #hp: number;
  #fill: string;
  #size: number;
  #spawned = false;
  delay: number;
  pos: Pos;
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
    this.pos = pos;
    this.delay = delay;
    this.#hp = hp;
    this.#gold = gold;
    this.speed = speed;
    this.#fill = fill;
    this.#size = size;

    const { shape, text } = this.#draw();
    this.#shape = shape;
    this.#text = text;
    this.move();
  }

  get id() {
    return this.#id;
  }
  get hp() {
    return this.#hp;
  }
  get fill() {
    return this.#fill;
  }
  get spawned() {
    return this.#spawned;
  }

  #draw() {
    const shape = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");

    shape.setAttribute("id", this.#id);
    shape.setAttribute("points", this.getPoints());
    shape.setAttribute("data-hp", String(this.hp));
    shape.setAttribute("data-entity", "enemy");
    shape.setAttribute("fill", this.fill);
    shape.setAttribute("style", "transform-box: fill-box; transform-origin: center");
    shape.setAttribute("transform", `rotate(${this.rotation})`);

    text.setAttribute("x", String(this.pos.x));
    text.setAttribute("y", String(this.pos.y + 15));
    text.textContent = this.hp.toFixed(0);



    return { shape, text };
  }

  move() {
    // setInterval(() => {
    //   this.#shape.setAttribute("transform", `translate(0, -${count++}) rotate(${this.rotation})`);
    //   this.#text.setAttribute("transform", `translate(0, -${count++})`);
    // }, 60);
  }

  getPoints() {
    const { x, y } = this.pos;
    const points = [
      { x: x + this.#size * 2, y },
      { x: x - this.#size, y: y + this.#size },
      { x: x - this.#size, y: y - this.#size },
      { x: x + this.#size * 2, y },
    ];
    return points.map(p => `${Math.trunc(p.x)} ${Math.trunc(p.y)} `).join("");
  }

  spawn() {
    this.#spawned = true;
    enemies_g.append(this.#shape);
    enemies_g.append(this.#text);
  }
}
