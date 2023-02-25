import { getStageNumberFromUrl } from "../lib/helpers";
import { Player } from "../classes/Player";
import { Game } from "../classes/Game";
import { STAGES_AND_WAVES } from "../lib/constants";
import { RingMenu } from "../classes/RingMenu";
import { Clock } from "../classes/Clock";
import { Enemy } from "../classes/Enemy";

type StageKeys = keyof typeof STAGES_AND_WAVES;

const player = new Player();
const stageNumber = getStageNumberFromUrl() as StageKeys;
const stageInfo = STAGES_AND_WAVES[stageNumber];


const game = new Game(stageInfo);
new RingMenu(game);

// const enemy = new Enemy({ x: 250, y: 300 }, "goblin", "center");
// const enemy2 = new Enemy({ x: 150, y: 250 }, "troll", "center");

console.log(player, game);

// clock.play();

// setTimeout(() => {
//   clock.pause();
//   clock.changeSpeed(2);
// }, 2000);
// setTimeout(() => {
//   clock.play();
// }, 3000);
// setTimeout(() => {
//   clock.pause();
//   clock.changeSpeed(1);
// }, 5000);
// setTimeout(() => {
//   clock.play();
// }, 6000);
// setTimeout(() => {
//   clock.pause();
// }, 8000);
