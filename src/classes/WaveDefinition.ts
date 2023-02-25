import { EnemyType } from "./Enemy";
import { EnemyLane } from "./Tile";

export interface WaveEnemy {
  type: EnemyType;
  lane: EnemyLane;
  delay: number;
}

export interface WaveTimes {
  start: number; end: number | null;
}

export class WaveDefinition {
  wave: WaveEnemy[] = [];

  defEnemySeq(
    enemyType: EnemyType,
    lane: EnemyLane,
    quantity: number,
    startingAtInSeconds: number,
    intervalInSeconds = 1
  ) {
    if (intervalInSeconds < 0.1) throw Error("minimum interval is 0.1");

    for (let i = 0; i < quantity; i++) {
      this.wave.push({
        type: enemyType,
        lane,
        delay: startingAtInSeconds + intervalInSeconds * i,
      });
    }
    return this;
  }

  build() {
    return this;
  }
}
