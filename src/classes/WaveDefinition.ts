export class WaveDefinition {
  wave: any[] = [];

  defEnemySeq(
    enemyType: string,
    lane: "left" | "center" | "right",
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
