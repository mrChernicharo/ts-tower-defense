import { getStageNumberFromUrl } from "../lib/helpers";
import { Player } from "../classes/Player";
import { Game } from "../classes/Game";
import { STAGES_AND_WAVES } from "../lib/constants";

type StageKeys = keyof typeof STAGES_AND_WAVES;

const player = new Player();
const stageNumber = getStageNumberFromUrl() as StageKeys;
const stageInfo = STAGES_AND_WAVES[stageNumber];

const game = new Game(stageInfo);

console.log(player, game);
