import { ENEMIES } from "../lib/constants";
import { enemies_g } from "../lib/DOM_elements";
import { generateUUID } from "../lib/helpers";
import { EnemyLane, Pos } from "./Tile";

export type EnemyType = "goblin" | "orc" | "troll" | "dragon";

export class Enemy {
  #type: EnemyType;
  #id: string;
  #lane: EnemyLane;
  #shape: SVGPolygonElement;
  #gold: number;
  #text: SVGTextElement;
  #hp: number;
  #fill: string;
  #size: number;
  pos: Pos;
  done = false;
  rotation = -90;
  percProgress = 0;
  speed: number;
  progress = 0;
  constructor(pos: Pos, type: EnemyType, lane: EnemyLane) {
    const { hp, gold, speed, fill, size } = ENEMIES[type];

    this.#id = `${type}-${generateUUID(16)}`;
    this.#type = type;
    this.#lane = lane;
    this.pos = pos;
    this.#hp = hp;
    this.#gold = gold;
    this.speed = speed;
    this.#fill = fill;
    this.#size = size;

    const { shape, text } = this.#draw();
    this.#shape = shape;
    this.#text = text;
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

    enemies_g.append(shape);
    enemies_g.append(text);
    // this.move();

    return { shape, text };
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
}
