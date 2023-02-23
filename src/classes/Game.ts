import {
  initialGold,
  initialEmeralds,
  initialCastleHP,
  STAGES_AND_WAVES,
} from "../lib/constants";
import { stage_name_span, stage_number_span } from "../lib/DOM_elements";

export class Game {
  // frameId = 0;
  // tick = 0;
  // clock = 0;
  // gold = initialGold;
  // emeralds = initialEmeralds;
  // castleHP = initialCastleHP;
  // mouse = { x: null; y: null };
  // lastClick = { x: null; y: null };
  // enemies = [];
  // towers = [];
  // bullets = [];
  // tiles = null;
  // bulletCount = 0;
  // tileChain = [];
  // selectedTile = null;
  // lastSelectedTile = null;
  // isPlaying = false;
  // inBattle = false;
  // towerPreviewActive = false;
  // stageNumber = 1;
  // waveNumber = null;
  // wavesTimes = [{ start: 0; end: null }];
  // gameSpeed = 2;

  constructor(
    stageInfo: typeof STAGES_AND_WAVES[keyof typeof STAGES_AND_WAVES]
  ) {
    console.log({ stageInfo });

    stage_number_span.textContent = `Stage ${stageInfo.stage.number}`;
    stage_name_span.textContent = `${stageInfo.stage.name}`;
  }
}
