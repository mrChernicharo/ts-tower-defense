import { RING_MENU_ICONS, TILE_WIDTH } from "../lib/constants";
import { ring_menu_g } from "../lib/DOM_elements";
import { Game } from "./Game";
import { Pos, Tile } from "./Tile";

export type RingMenuType = "traps" | "newPath" | "towerDetail" | "newTower";
export type IconDirection = "left" | "right" | "bottom";

const ringOffset = TILE_WIDTH * 0.25;

export class RingMenu {
  #path: SVGPathElement;
  #game: Game;

  constructor(game: Game) {
    this.#game = game;
    this.#path = this.#draw();
    ring_menu_g.append(this.#path);
    this.#appendEventListeners();
  }

  #appendEventListeners() {
    document.addEventListener("show-ring-menu", (e: CustomEvent<Tile>) => {
      // console.log("show-ring-menu", pos);
      if (e.detail.isBlocked) return;
      this.translate(e.detail.pos);
      this.#appendRingButtons(e.detail);
      this.show();
    });

    document.addEventListener("hide-ring-menu", () => {
      // console.log("show-ring-menu", pos);
      this.#removeRingButtons();
      this.hide();
    });
  }

  #draw() {
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.id = "ring-menu";
    path.setAttribute("height", TILE_WIDTH * 1.5 + "px");
    path.setAttribute("stroke-width", "10px");
    path.setAttribute("stroke", "#245");
    path.setAttribute("fill", "none");
    path.setAttribute("d", "M 150 75 A 75 75 0 1 1 150 74.99");
    path.setAttribute("opacity", "0");
    // path.setAttribute("style", `transform: translate(-${ringOffset}px, -${ringOffset}px)`);
    return path;
  }

  #appendRingButtons(tile: Tile) {
    if (tile.getMenuType()) {
      this.#drawRingIcons(tile);
    }
  }

  #drawRingIcons(tile: Tile) {
    const menuType = tile.getMenuType()!;

    const icons = [];
    for (const [i, menuIcon] of RING_MENU_ICONS[menuType].entries()) {
      if (menuType === "newPath") {
        const iconDirection = menuIcon.type.split("-")[1] as IconDirection;
        const adjacentTile = this.#game.getAdjacentTile(tile, iconDirection);
        const isBuildableAdj =
          !tile.connected && adjacentTile && !adjacentTile.isBlocked && adjacentTile.canBecomePath();

        if (!isBuildableAdj) continue;
      }

      const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
      const pattern = document.createElementNS("http://www.w3.org/2000/svg", "pattern");
      const image = document.createElementNS("http://www.w3.org/2000/svg", "image");

      const patternId = `pattern-${menuIcon.id}`;
      const ringColor = menuIcon.color;
      // if (menuType === "newTower" && !canAfford(TOWERS[menuIcon.type].price)) {
      //   ringColor = "#999";
      // }

      circle.setAttribute("class", `ring-button`);
      circle.setAttribute("data-entity", `ring-button`);
      circle.setAttribute("data-type", menuIcon.type);
      circle.setAttribute("id", menuIcon.id);
      circle.setAttribute("cx", String(tile.pos.x + menuIcon.x - ringOffset));
      circle.setAttribute("cy", String(tile.pos.y + menuIcon.y - ringOffset));
      circle.setAttribute("r", "20");
      circle.setAttribute("stroke", ringColor);
      circle.setAttribute("stroke-width", "2");
      circle.setAttribute("fill", `url(#${patternId})`);

      defs.setAttribute("id", `defs-${menuIcon.id}`);
      defs.setAttribute("class", "defs");

      pattern.setAttribute("id", patternId);
      pattern.setAttribute("width", "28");
      pattern.setAttribute("height", "28");

      image.setAttribute("href", menuIcon.img);
      image.setAttribute("id", `image-${menuIcon.id}`);
      image.setAttribute("x", "6");
      image.setAttribute("y", "6");
      image.setAttribute("width", "28");
      image.setAttribute("height", "28");

      // if (menuType === "newTower" && !canAfford(TOWERS[menuIcon.type].price)) {
      //   image.setAttribute("style", "filter: grayscale(1)");
      // }

      pattern.append(image);
      defs.append(pattern);
      ring_menu_g.append(defs);
      ring_menu_g.append(circle);

      icons.push(circle);
    }
    return icons;
  }

  #removeRingButtons() {
    Array.from(document.querySelectorAll(".ring-button")).forEach(icon => {
      // icon.removeEventListener("click", menuActions[icon.dataset.type]);
      icon.remove();
    });
    Array.from(document.querySelectorAll("g#ring-menu-g .defs")).forEach(defs => {
      // remove defs for ring icons, but leave tower defs
      if (!defs.classList.contains("tower-defs")) {
        defs.remove();
      }
    });
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
