import { player_id_div, player_level_div } from "./DOM_elements";
import { generateUUID } from "./helpers";

export class Player {
  #id = "";
  #level = 1;

  constructor() {
    this.#id = localStorage.getItem("player_id") || generateUUID(24);

    let playerInfo;
    if (typeof localStorage.getItem(`player_info_${this.#id}`) === "string") {
      playerInfo = JSON.parse(
        localStorage.getItem(`player_info_${this.#id}`) ?? ""
      );
      this.#level = playerInfo.level;
    }

    localStorage.setItem("player_id", this.#id);
    this.#savePlayerInfo({ level: this.#level });
    player_id_div.textContent = `id: ${this.#id}`;
    player_level_div.textContent = `level: ${this.#level}`;
  }

  #savePlayerInfo(info: any) {
    localStorage.setItem(`player_info_${this.#id}`, JSON.stringify(info));
  }

  levelUp() {
    this.#level++;
    player_level_div.textContent = `level: ${this.#level}`;
    this.#savePlayerInfo({ level: this.#level });
  }

  get id() {
    return this.#id;
  }

  get level() {
    return this.#level;
  }
}
