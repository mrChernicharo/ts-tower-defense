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
  pos: Pos = { x: 0, y: 0 };

  constructor(game: Game) {
    this.#game = game;
    this.#path = this.#draw();
    ring_menu_g.append(this.#path);
    this.#appendEventListeners();
  }

  #appendEventListeners() {
    document.addEventListener("show-ring-menu", (e: CustomEvent<Tile>) => {
      // console.log("show-ring-menu", e.detail, e.detail.pos.x, e.detail.pos.y);
      if (e.detail.isBlocked) return;

      this.#appendRingButtons(e.detail);
      this.show();
      this.translate({ x: e.detail.pos.x, y: e.detail.pos.y });
    });

    document.addEventListener("hide-ring-menu", () => {
      // console.log("show-ring-menu", pos);
      this.#removeRingButtons();
      this.hide();
    });

    document.addEventListener("on-wave-end", () => {
      if (this.#game.selectedTile && this.#game.selectedTile.getMenuType() === "newPath") {
        this.#appendRingButtons(this.#game.selectedTile);
      }
    });
  }

  #draw() {
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.id = "ring-menu";
    path.setAttribute("height", TILE_WIDTH * 1.5 + "px");
    path.setAttribute("stroke-width", TILE_WIDTH * 0.1 + "px");
    path.setAttribute("stroke", "#245");
    path.setAttribute("fill", "none");
    path.setAttribute(
      "d",
      `
      M ${TILE_WIDTH * 1.5} ${TILE_WIDTH * 0.75} 
      A ${TILE_WIDTH * 0.75}  ${TILE_WIDTH * 0.75} 0 1 1 ${TILE_WIDTH * 1.5} ${TILE_WIDTH * 0.7499}`
    );
    path.setAttribute("opacity", "0");
    path.setAttribute("pointer-events", "none");
    return path;
  }

  #appendRingButtons(tile: Tile) {
    if (tile.getMenuType()) {
      const buttons = this.#drawRingButtons(tile);
      if (buttons) {
        this.#attachButtonsListeners(buttons, tile);
      }
    }
  }

  #drawRingButtons(tile: Tile) {
    const menuType = tile.getMenuType()!;

    const buttons: SVGCircleElement[] = [];
    for (const [i, menuButton] of RING_MENU_ICONS[menuType].entries()) {
      if (menuType === "newPath") {
        // don't add  newPath buttons if inBattle
        if (this.#game.inBattle) return;

        const iconDirection = menuButton.type.split("-")[1] as IconDirection;
        const adjacentTile = this.#game.getAdjacentTile(tile, iconDirection);
        const isBuildableAdj =
          !tile.connected && adjacentTile && !adjacentTile.isBlocked && adjacentTile.canBecomePath();

        if (!isBuildableAdj) continue;
      }

      const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
      const pattern = document.createElementNS("http://www.w3.org/2000/svg", "pattern");
      const image = document.createElementNS("http://www.w3.org/2000/svg", "image");

      const patternId = `pattern-${menuButton.id}`;
      const ringColor = menuButton.color;
      // if (menuType === "newTower" && !canAfford(TOWERS[menuIcon.type].price)) {
      //   ringColor = "#999";
      // }

      circle.setAttribute("class", `ring-button`);
      circle.setAttribute("data-entity", `ring-button`);
      circle.setAttribute("data-type", menuButton.type);
      circle.setAttribute("id", menuButton.id);
      circle.setAttribute("cx", String(tile.pos.x + menuButton.x - ringOffset));
      circle.setAttribute("cy", String(tile.pos.y + menuButton.y - ringOffset));
      circle.setAttribute("r", TILE_WIDTH * 0.2 + "px");
      circle.setAttribute("stroke", ringColor);
      circle.setAttribute("stroke-width", "2");
      circle.setAttribute("fill", `url(#${patternId})`);

      defs.setAttribute("id", `defs-${menuButton.id}`);
      defs.setAttribute("class", "defs");

      pattern.setAttribute("id", patternId);
      pattern.setAttribute("width", TILE_WIDTH * 0.28 + "px");
      pattern.setAttribute("height", TILE_WIDTH * 0.28 + "px");

      image.setAttribute("href", menuButton.img);
      image.setAttribute("id", `image-${menuButton.id}`);
      image.setAttribute("x", TILE_WIDTH * 0.06 + "px");
      image.setAttribute("y", TILE_WIDTH * 0.06 + "px");
      image.setAttribute("width", TILE_WIDTH * 0.28 + "px");
      image.setAttribute("height", TILE_WIDTH * 0.28 + "px");

      // if (menuType === "newTower" && !canAfford(TOWERS[menuIcon.type].price)) {
      //   image.setAttribute("style", "filter: grayscale(1)");
      // }

      pattern.append(image);
      defs.append(pattern);
      ring_menu_g.append(defs);
      ring_menu_g.append(circle);

      buttons.push(circle);
    }
    return buttons;
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

  #attachButtonsListeners(buttons: SVGCircleElement[], tile: Tile) {
    buttons.forEach(button => {
      button.onclick = (e: MouseEvent) => {
        // console.log("clicked menu button", { button, tile, menuType: tile.getMenuType() });
        const menuType = tile.getMenuType();
        if (!menuType) return;
        const ringMenuButtonClick = new CustomEvent("ring-menu-button-click", { detail: { e, menuType } });
        document.dispatchEvent(ringMenuButtonClick);

        switch (menuType) {
          case "newPath":
            this.#game.createNewPath(tile, button);
            break;
          case "newTower":
            break;
          case "traps":
            break;
          case "towerDetail":
            break;
        }
      };
    });
  }

  translate(pos: Pos) {
    // console.log("translate", { x: pos.x, y: pos.y, t: this });
    this.pos = pos;
    this.#path.setAttribute("transform", `translate(${this.pos.x - ringOffset}, ${this.pos.y - ringOffset})`);
  }
  show() {
    this.#path.setAttribute("opacity", "0.5");
  }
  hide() {
    this.#path.setAttribute("opacity", "0");
  }
}
