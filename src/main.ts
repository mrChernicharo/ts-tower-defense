import { addStarsBtn, levelUpBtn, spend5StarsBtn } from "./lib/DOM_elements";
import { Player } from "./classes/Player";

export const player = new Player();

levelUpBtn.onclick = (e: MouseEvent) => {
  player.levelUp();
};
addStarsBtn.onclick = (e: MouseEvent) => {
  player.earnStars(2);
};
spend5StarsBtn.onclick = (e: MouseEvent) => {
  player.spendStars(5);
};
