import { ENEMIES, TILE_WIDTH } from "../lib/constants";
import { enemies_g, enemy_lane_paths } from "../lib/DOM_elements";
import { generateUUID, getAngle } from "../lib/helpers";
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
    this.#shape = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    this.#text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    this.#shape.setAttribute("id", this.#id);

    this.#draw();

    // this.move();
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
    this.#shape.setAttribute("points", this.getPoints());
    this.#shape.setAttribute("data-hp", String(this.hp));
    this.#shape.setAttribute("data-entity", "enemy");
    this.#shape.setAttribute("fill", this.fill);
    this.#shape.setAttribute("style", "transform-box: fill-box; transform-origin: center");
    this.#shape.setAttribute("transform", `rotate(-90)`);

    this.#text.setAttribute("x", String(this.#pos.x));
    this.#text.setAttribute("y", String(this.#pos.y + 15));
    this.#text.textContent = this.hp.toFixed(0);

    enemies_g.append(this.#shape);
    enemies_g.append(this.#text);
  }

  move() {
    const prog = this.#lane.getTotalLength() - (this.#lane.getTotalLength() - (this.progress + this.speed));

    const nextPos = this.#lane.getPointAtLength(this.#lane.getTotalLength() - prog);

    // get enemy facing angle: find angle considering pos and nextPos
    const rotation = getAngle(this.#pos.x, this.#pos.y, nextPos.x, nextPos.y);

    // update enemies' progress
    this.percProgress = (prog / this.#lane.getTotalLength()) * 100;
    this.progress = prog;
    this.#pos.x = nextPos.x;
    this.#pos.y = nextPos.y;
    this.#text.setAttribute("x", String(nextPos.x));
    this.#text.setAttribute("y", String(nextPos.y));
    this.#text.textContent = this.hp.toFixed(0);

    // console.log({
    //   totalLen: this.#lane.getTotalLength(),
    //   prog,
    //   initialPoint: this.#lane.getPointAtLength(0),
    //   finalPoint: this.#lane.getPointAtLength(this.#lane.getTotalLength()),
    //   lane: this.#lane,
    // });

    // this.#shape.setAttribute("transform", `rotate(-90)`);
    // this.#shape.setAttribute("transform", `rotate(${this.rotation})`);
    this.#shape.setAttribute("points", this.getPoints());

    this.#shape.setAttribute("transform", `rotate(${rotation})`);
    // translate(${nextPos.x},${nextPos.y})
    // `translate(${nextPos.x - this.#size / 2},${nextPos.y - TILE_WIDTH * 3})
    // console.log({ prog, totalLength: this.#lane.getTotalLength(), nextPos, rotation: this.rotation });
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
    this.#spawned = true;
  }

  die() {}

  finish() {
    this.done = true
    this.#shape.setAttribute("transform", `rotate(-90)`);
    this.#shape.remove()
  }
}
