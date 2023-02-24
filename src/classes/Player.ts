import { player_id_div, player_level_div, player_stars_div } from "../lib/DOM_elements";
import { generateUUID } from "../lib/helpers";

export class Player {
  #id = "";
  #level = 1;
  #stars = 0;
  #castleHP = 10;
  #gold = 200;
  #emeralds = 50;

  constructor() {
    this.#id = localStorage.getItem("player_id") || generateUUID(24);

    if (localStorage.getItem(`player_info_${this.#id}`)) {
      const { level, stars } = JSON.parse(localStorage.getItem(`player_info_${this.#id}`)!);
      this.#level = level;
      this.#stars = stars;
    }

    localStorage.setItem("player_id", this.#id);

    this.#savePlayerInfo();

    player_id_div && (player_id_div.textContent = `id: ${this.#id}`);
    player_level_div && (player_level_div.textContent = `level: ${this.#level}`);
    player_stars_div && (player_stars_div.textContent = `stars: ${this.#stars}`);
  }

  #savePlayerInfo() {
    const info = { level: this.#level, stars: this.#stars };
    localStorage.setItem(`player_info_${this.#id}`, JSON.stringify(info));
  }

  levelUp() {
    this.#level++;
    player_level_div && (player_level_div.textContent = `level: ${this.#level}`);
    this.#savePlayerInfo();
  }

  earnStars(stars: number) {
    this.#stars += stars;
    player_stars_div && (player_stars_div.textContent = `stars: ${this.#stars}`);
    this.#savePlayerInfo();
  }

  spendStars(stars: number) {
    if (stars > this.#stars) {
      console.log("not enough stars");
      return;
    }
    this.#stars -= stars;
    player_stars_div && (player_stars_div.textContent = `stars: ${this.#stars}`);
    this.#savePlayerInfo();
  }

  earnGold(amount: number) {
    this.#gold += amount;
  }

  spendGold(amount: number) {
    if (amount > this.#gold) {
      console.log("not enough gold");
      return;
    }
    this.#gold -= amount;
  }

  earnEmeralds(amount: number) {
    this.#emeralds += amount;
  }

  spendEmeralds(amount: number) {
    if (amount > this.#emeralds) {
      console.log("not enough emeralds");
      return;
    }
    this.#emeralds -= amount;
  }

  takeDamage(damage = 1) {
    this.#castleHP -= damage;
  }

  isAlive() {
    return this.#castleHP > 0;
  }

  get id() {
    return this.#id;
  }

  get level() {
    return this.#level;
  }
}
