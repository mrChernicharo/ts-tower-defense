import { StagesList } from "../classes/StagesList";
import { Player } from "../classes/Player";

const player = new Player();

const stagesList = new StagesList(player.level);

console.log(player, stagesList);
