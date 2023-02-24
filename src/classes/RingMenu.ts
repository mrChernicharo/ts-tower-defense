import { TILE_WIDTH } from "../lib/constants";
import { scene } from "../lib/DOM_elements";
import { Pos, Tile } from "./Tile";

const ringOffset = TILE_WIDTH * 0.25;

export class RingMenu {
  #path: SVGPathElement;

  constructor() {
    this.#path = this.#draw();
    scene.append(this.#path);
    this.#appendEventListeners();
  }

  #appendEventListeners() {
    document.addEventListener("show-ring-menu", (e: CustomEvent<Tile>) => {
      const pos = e.detail.pos;
      // console.log("show-ring-menu", pos);
      this.translate(pos);
      this.show();
    });

    document.addEventListener("hide-ring-menu", (e: CustomEvent<Tile>) => {
      const pos = e.detail.pos;
      // console.log("show-ring-menu", pos);
      this.hide();
    });
  }

  #draw() {
    const pathElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
    pathElement.id = "ring-menu";
    pathElement.setAttribute("height", TILE_WIDTH * 1.5 + "px");
    pathElement.setAttribute("stroke-width", "10px");
    pathElement.setAttribute("stroke", "#245");
    pathElement.setAttribute("fill", "none");
    pathElement.setAttribute("d", "M 150 75 A 75 75 0 1 1 150 74.99");
    pathElement.setAttribute("opacity", "0");
    pathElement.setAttribute("style", `transform: translate(-${ringOffset}px, -${ringOffset}px)`);

    return pathElement;
  }

  translate(pos: Pos) {
    this.#path.setAttribute("style", `transform: translate(${pos.x - ringOffset}px, ${pos.y - ringOffset}px)`);
  }
  show() {
    this.#path.setAttribute("opacity", "0.5");
  }
  hide() {
    this.#path.setAttribute("opacity", "0");
  }
}
