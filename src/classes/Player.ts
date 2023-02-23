import { player_id_div, player_level_div, player_stars_div } from "../lib/DOM_elements";
import { generateUUID } from "../lib/helpers";

export class Player {
  #id = "";
  #level = 1;
  #stars = 0;

  constructor() {
    this.#id = localStorage.getItem("player_id") || generateUUID(24);

    let playerInfo;
    if (typeof localStorage.getItem(`player_info_${this.#id}`) === "string") {
      playerInfo = JSON.parse(
        localStorage.getItem(`player_info_${this.#id}`) ?? ""
      );
      this.#level = playerInfo.level;
      this.#stars = playerInfo.stars;
    }

    localStorage.setItem("player_id", this.#id);
    this.#savePlayerInfo();
    player_id_div.textContent = `id: ${this.#id}`;
    player_level_div.textContent = `level: ${this.#level}`;
    player_stars_div.textContent = `stars: ${this.#stars}`;
  }

  #savePlayerInfo() {
    const info = { level: this.#level, stars: this.#stars };
    localStorage.setItem(`player_info_${this.#id}`, JSON.stringify(info));
  }

  levelUp() {
    this.#level++;
    player_level_div.textContent = `level: ${this.#level}`;
    this.#savePlayerInfo();
  }

  earnStars(stars: number) {
    this.#stars += stars;
    player_stars_div.textContent = `stars: ${this.#stars}`;
    this.#savePlayerInfo();
  }

  spendStars(stars: number) {
    if (stars > this.#stars) {
      console.log('not enough stars')
      return
    }
    this.#stars -= stars;
    player_stars_div.textContent = `stars: ${this.#stars}`;
    this.#savePlayerInfo();
  }

  get id() {
    return this.#id;
  }

  get level() {
    return this.#level;
  }
}
