import { getStageNumberFromUrl } from "../lib/helpers";
import { Player } from "../classes/Player";
import { Game } from "../classes/Game";
import { STAGES_AND_WAVES } from "../lib/constants";
import { RingMenu } from "../classes/RingMenu";
import { Clock } from "../classes/Clock";

type StageKeys = keyof typeof STAGES_AND_WAVES;

const player = new Player();
const stageNumber = getStageNumberFromUrl() as StageKeys;
const stageInfo = STAGES_AND_WAVES[stageNumber];

const clockCallback = (frame: number, argB: any) => console.log({ frame, argB });

const clock = new Clock(clockCallback);
const game = new Game(stageInfo, clock);
new RingMenu(game);



console.log(player, game, clock);

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
