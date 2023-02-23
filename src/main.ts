import { btn } from "./DOM_elements";
import { Player } from "./Player";

export const player = new Player();

btn.onclick = (e: MouseEvent) => {
  player.levelUp();
  console.log(e, player);
};
