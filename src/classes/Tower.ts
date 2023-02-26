import { TILE_WIDTH, TOWERS } from "../lib/constants";
import { scene } from "../lib/DOM_elements";
import { getDistanceBetweenAngles } from "../lib/helpers";
import { TowerType } from "./RingMenu";
import { Pos } from "./Tile";

export class Tower {
  #id: string;
  #pos: Pos;
  #type: TowerType;
  #shape: SVGRectElement;
  #g: SVGGElement;
  // #defs: SVGDefsElement;
  // #pattern: SVGPatternElement;
  // #image: SVGImageElement;

  cooldown = 0;
  lastShot = 0;
  shotsPerSecond = 0;
  rotation = 0;
  xp = 0;
  fill: string;
  range = 0;
  damage = 0;
  bullet_speed = 0;
  rate_of_fire = 0;
  price = 0;

  constructor(pos: Pos, type: TowerType) {
    this.#id = `tower-${pos.y}-${pos.x}`;
    this.#type = type;
    this.#pos = { x: pos.x + TILE_WIDTH / 2, y: pos.y + TILE_WIDTH / 2 };
    this.fill = TOWERS[this.#type].fill;
    this.range = TOWERS[this.#type].range;
    this.damage = TOWERS[this.#type].damage;
    this.bullet_speed = TOWERS[this.#type].bullet_speed;
    this.rate_of_fire = TOWERS[this.#type].rate_of_fire;
    this.price = TOWERS[this.#type].price;
    this.#g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    this.#shape = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    this.#draw();
  }

  get pos() {
    return this.#pos;
  }

  #draw() {
    this.shotsPerSecond = 60 / this.rate_of_fire / 60;

    const patternId = `pattern-${this.#id}`;
    const translations = {
      fire: "translate(-36, -50)",
      ice: "translate(-36, -50)",
      lightning: "translate(-36, -50)",
      earth: "translate(-49, -50)",
    };

    this.#shape.setAttribute("id", this.#id);
    this.#shape.setAttribute("x", String(this.#pos.x));
    this.#shape.setAttribute("y", String(this.#pos.y));
    this.#shape.setAttribute("data-entity", "tower");
    this.#shape.setAttribute("data-type", this.#type);
    this.#shape.setAttribute("width", String(TILE_WIDTH));
    this.#shape.setAttribute("height", String(TILE_WIDTH));

    this.#shape.setAttribute("fill", `url(#${patternId})`);
    this.#shape.setAttribute("transform", translations[this.#type]);

    const rangeCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    rangeCircle.setAttribute("id", `range-${this.#id}`);
    rangeCircle.classList.add("tower-range");

    rangeCircle.setAttribute("cx", String(this.#pos.x));
    rangeCircle.setAttribute("cy", String(this.#pos.y));
    rangeCircle.setAttribute("r", String(this.range));
    rangeCircle.setAttribute("fill", this.fill);
    rangeCircle.setAttribute("opacity", "0");
    rangeCircle.setAttribute("pointer-events", "none");

    this.#shape.onpointerover = () => this.handlePointerOver(rangeCircle);
    this.#shape.onpointerout = () => this.handlePointerOut(rangeCircle);

    const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    const pattern = document.createElementNS("http://www.w3.org/2000/svg", "pattern");
    const image = document.createElementNS("http://www.w3.org/2000/svg", "image");
    defs.setAttribute("id", `defs-${this.#id}`);
    defs.setAttribute("class", "defs tower-defs");
    pattern.setAttribute("id", patternId);
    pattern.setAttribute("width", "1");
    pattern.setAttribute("height", "1");
    image.setAttribute("href", TOWERS[this.#type].img);
    image.setAttribute("id", `image-${this.#id}`);
    image.setAttribute("width", String(TILE_WIDTH));
    image.setAttribute("height", String(TILE_WIDTH));

    this.applyRotation(90);

    pattern.append(image);
    defs.append(pattern);
    this.#g.append(defs);
    this.#g.append(rangeCircle);
    this.#g.append(this.#shape);
    scene.append(this.#g);
  }

  rotateTowardsEnemy(angle) {
    const distanceToNextAngle = getDistanceBetweenAngles(this.rotation, angle);

    const towerWantsToLeap = distanceToNextAngle >= 5;
    const leapOver180 = distanceToNextAngle > 180;

    if (towerWantsToLeap && leapOver180) {
      angle = angle > this.rotation ? this.rotation + 4.5 + 360 : this.rotation - 4.5 - 360;
    } else if (towerWantsToLeap) {
      angle = angle > this.rotation ? this.rotation + 4.5 : this.rotation - 4.5;
    }

    this.applyRotation(angle);
  }

  applyRotation(angle: number) {
    this.rotation = angle;
    this.#g.setAttribute("transform", `rotate(${this.rotation}, ${this.#pos.x}, ${this.#pos.y})`);
  }

  handlePointerOver(rangeCircle: SVGCircleElement) {
    if (!rangeCircle.classList.contains("locked")) {
      rangeCircle.setAttribute("opacity", "0.1");
    }
  }

  handlePointerOut(rangeCircle: SVGCircleElement) {
    if (!rangeCircle.classList.contains("locked")) {
      rangeCircle.setAttribute("opacity", "0");
    }
  }
}
