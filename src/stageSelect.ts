import { StagesList } from "./classes/StagesList";
import { Player } from "./Player";

const player = new Player();

const stagesList = new StagesList(player.level);

console.log(player, stagesList);
