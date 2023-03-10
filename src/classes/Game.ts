import { STAGES_AND_WAVES, TILE_WIDTH } from "../lib/constants";
import {
  enemy_lane_paths,
  game_speed_form,
  play_pause_btn,
  scene,
  stage_name_span,
  stage_number_span,
  svg,
} from "../lib/DOM_elements";
import { drawPath, getAngle, getDistanceBetweenAngles, getDistanceBetweenPoints } from "../lib/helpers";
import { Clock } from "./Clock";
import { Enemy } from "./Enemy";
import { IconDirection, TowerType } from "./RingMenu";
import { Pos, Tile, TileType } from "./Tile";
import { Tower } from "./Tower";
import { WaveDefinition, WaveEnemy, WaveTimes } from "./WaveDefinition";

type StageInfo = typeof STAGES_AND_WAVES[keyof typeof STAGES_AND_WAVES];

export class Game {
  tiles: Tile[];
  enemies: Enemy[] = [];
  towers: Tower[] = [];
  // bullets: Bullet[] = [];
  // bulletCount = 0;
  // towerPreviewActive = false;
  #waves: WaveDefinition[];
  tileChain: Tile[];
  #selectedTile: Tile | null = null;
  #lastSelectedTile: Tile | null = null;
  #inBattle = false;
  #stageName: string;
  #stageNumber: number;
  #rows: number;
  #cols: number;
  #baseTile: string;
  #blockedTiles: any;
  #wallTiles: any;
  #entrypoint: any;
  #firstWaveAtRow: number;
  #waveLine: number;
  #waveNumber = 0;
  #clock: Clock;
  currentWave: Enemy[] = [];
  waveTimes: WaveTimes[] = [];
  // wavesTimes = [{ start: 0; end: null }];
  // gameSpeed = 2;

  constructor(stageInfo: StageInfo) {
    // console.log({ stageInfo });
    const { stage, blockedTiles, wallTiles, waves } = stageInfo;
    const { name, number, cols, rows, baseTile, entrypoint, firstWaveAtRow } = stage;

    this.#stageName = name;
    this.#stageNumber = number;
    this.#cols = cols;
    this.#rows = rows;

    this.#baseTile = baseTile;
    this.#entrypoint = entrypoint;
    this.#firstWaveAtRow = firstWaveAtRow;
    this.#waveLine = this.#firstWaveAtRow;

    this.#wallTiles = wallTiles;
    this.#blockedTiles = blockedTiles;
    this.#waves = waves;

    stage_number_span.textContent = `Stage ${this.#stageNumber}`;
    stage_name_span.textContent = `${this.#stageName}`;

    this.tiles = this.#createGrid();
    this.tileChain = [this.tiles.find(t => t.isStartingPoint)!];
    this.#appendEventListeners();

    this.#clock = new Clock(this.#loopStep.bind(this));
  }

  get cols() {
    return this.#cols;
  }
  get rows() {
    return this.#rows;
  }
  get inBattle() {
    return this.#inBattle;
  }
  get selectedTile() {
    return this.#selectedTile;
    // return Object.assign({}, this.#selectedTile);
  }
  get waveNumber() {
    return this.#waveNumber.valueOf();
  }

  #createGrid() {
    // set scene size
    svg.setAttribute("width", String((this.#cols + 1) * TILE_WIDTH));
    svg.setAttribute("height", String((this.#rows + 1) * TILE_WIDTH));

    scene.setAttribute("style", `transform: translate(${TILE_WIDTH / 2}px, ${TILE_WIDTH / 2}px)`);

    const isInitialPath = (row: number, col: number) => row == 0 && col == this.#entrypoint;

    const isBlocked = (row: number, col: number) =>
      Boolean(this.#blockedTiles[row] && this.#blockedTiles[row].includes(col));

    const isWall = (row: number, col: number) => Boolean(this.#wallTiles[row] && this.#wallTiles[row].includes(col));

    const getTileType = (isStartingPoint: boolean) => {
      if (isStartingPoint) return `${this.#baseTile}-path-end-B`;
      else return this.#baseTile;
    };

    const tiles: Tile[] = [];
    for (let row of Array(this.#rows)
      .fill(null)
      .map((_, i) => i)) {
      for (let col of Array(this.#cols)
        .fill(null)
        .map((_, i) => i)) {
        const tilePos = { x: col * TILE_WIDTH, y: row * TILE_WIDTH };

        const tileId = `tile-${tilePos.y}-${tilePos.x}`;
        const tileIdx = row * this.#cols + col;

        const isStartingPoint = isInitialPath(row, col);
        const tileBlocked = isBlocked(row, col);

        const tileType = (tileBlocked ? "lava" : isWall(row, col) ? "rock" : getTileType(isStartingPoint)) as TileType;

        const newTile = new Tile(tileId, tileIdx, tilePos, tileType, this.#waveLine, isStartingPoint);

        tiles.push(newTile);
      }
    }
    return tiles;
  }

  #appendEventListeners() {
    document.addEventListener("click", (e: MouseEvent) => {
      if (!(e.target as HTMLElement).dataset.entity) {
        // console.log("clicked outside", e);
        this.#lastSelectedTile = this.#selectedTile;

        this.#selectedTile?.blur();
        this.#selectedTile = null;
        return;
      }
    });

    document.addEventListener("tile-clicked", (e: CustomEvent<Tile>) => {
      // console.log("tile-clicked", e.detail.pos.x, e.detail.pos.y);
      this.#lastSelectedTile = this.#selectedTile;
      this.#selectedTile = e.detail;

      if (this.#selectedTile?.id === this.#lastSelectedTile?.id) {
        // console.log("clicked same tile!");
        this.#selectedTile.blur();
        this.#selectedTile = null;
        return;
      }

      // console.log("clicked different tile!");
      this.#lastSelectedTile?.blur();
      this.#selectedTile.focus();
    });

    game_speed_form.onchange = (e: Event) => {
      e.preventDefault();

      switch ((e.target as any).value) {
        case "normal":
          this.#clock.changeSpeed(1);
          break;
        case "fast":
          this.#clock.changeSpeed(2);
          break;
        case "faster":
          this.#clock.changeSpeed(4);
          break;
      }
    };

    play_pause_btn.onclick = (e: MouseEvent) => {
      if (this.#clock.isPlaying) {
        this.#clock.pause();
        this.waveTimes[this.#waveNumber].end = this.#clock.time;
        return;
      }

      this.#clock.play();
      return;
    };

    document.addEventListener("ring-menu-button-click", event => {
      const { menuType } = event.detail;
      // const { e, menuType } = event.detail;
      // const target = e.target;
      // console.log("ring-menu-button-click", { e, menuType, event, target });

      switch (menuType) {
        case "newPath":
          document.dispatchEvent(new CustomEvent("hide-ring-menu", { detail: null }));
          this.selectedTile?.blur();
          break;
        case "newTower":
          //
          break;
        case "traps":
          //
          break;
        case "towerDetail":
          //
          break;
      }
    });
  }

  getAdjacentTile(tile: Tile, direction: IconDirection): Tile | null {
    let adj;
    switch (direction) {
      case "left":
        adj = this.tiles?.find(t => t.index === tile.index - 1 && tile.pos.x > 0);
        break;
      case "right":
        adj = this.tiles?.find(t => t.index === tile.index + 1 && tile.pos.x / TILE_WIDTH < this.cols - 1);
        break;
      case "bottom":
        adj = this.tiles?.find(t => t.index === tile.index + this.cols);
        break;
    }
    return adj || null;
  }

  createNewPath(tile: Tile, button: SVGCircleElement) {
    const direction = button.dataset.type!.split("-")[1] as IconDirection;
    const nextTile = this.getAdjacentTile(tile, direction);
    const prevTile = this.tileChain.at(-1);

    if (!prevTile || !nextTile) return;
    this.tiles[nextTile.index].turnIntoPathEnd(prevTile);
    this.tiles[prevTile.index].turnIntoPathSegment(nextTile);
    this.tileChain.push(nextTile);

    const barrierBroken =
      direction === "bottom" && nextTile.pos.y / TILE_WIDTH + 1 > this.#firstWaveAtRow + this.#waveNumber;

    this.updateEnemyLanes(barrierBroken);

    if (barrierBroken) {
      this.#onWaveStart();
    }
  }

  updateEnemyLanes(hasEnemyEntrance: boolean) {
    const chains = this.tileChain.reduce(
      (acc: { left: Pos[]; center: Pos[]; right: Pos[] }, tile) => {
        acc.left.push(tile.exits!.left);
        acc.center.push(tile.exits!.center);
        acc.right.push(tile.exits!.right);
        return acc;
      },
      {
        left: [],
        center: [],
        right: [],
      }
    );

    const lastTile = this.tileChain.at(-1)!;

    enemy_lane_paths.left.setAttribute("d", drawPath(chains.left, "left", hasEnemyEntrance));
    enemy_lane_paths.center.setAttribute("d", drawPath(chains.center, "center", hasEnemyEntrance));
    enemy_lane_paths.right.setAttribute("d", drawPath(chains.right, "right", hasEnemyEntrance));

    if (hasEnemyEntrance) {
      lastTile.isEnemyEntrance = true;
      // console.log(this.tiles, this.tileChain, lastTile.index);
    }
  }

  updateTilesVisibility() {
    const affectedTiles = this.tiles.filter(t => {
      const tileRow = Number(t.id.split("-")[1]) / TILE_WIDTH;
      return tileRow === this.#waveLine;
    });

    affectedTiles.forEach(t => {
      t.setVisibility(true);
    });
  }

  createNewTower(tile: Tile, towerType: TowerType) {
    this.#selectedTile = null;
    this.#lastSelectedTile = null;

    tile.hasTower = true;
    tile.blur();

    const towerPos = { x: tile.pos.x, y: tile.pos.y };
    const tower = new Tower(towerPos, towerType);

    this.towers.push(tower);
    console.log("create the tower", { tile, towerType, tower });
  }

  #onWaveStart() {
    console.log("onWaveStart init", {
      waveNumber: this.#waveNumber,
      waveTimes: this.waveTimes,
      time: this.#clock.time,
    });

    this.updateTilesVisibility();
    this.#waveLine++;
    play_pause_btn.removeAttribute("disabled");

    this.waveTimes = [...this.waveTimes, { start: this.#clock.time, end: null }];

    const lastTile = this.tileChain.at(-1)!;
    const enemyPos = { x: lastTile.pos.x, y: lastTile.pos.y }; // passing lastTile.pos directly will cause nasty bugs!

    this.currentWave = this.#waves[this.#waveNumber].wave.map(
      enemy => new Enemy(enemyPos, enemy.type, enemy.lane, enemy.delay)
    );

    this.#clock.play();

    this.#inBattle = true;
    console.log("onWaveStart after", {
      waveNumber: this.#waveNumber,
      waveTimes: this.waveTimes,
      time: this.#clock.time,
    });
  }

  #onWaveEnd() {
    console.log("onWaveEnd init", { waveNumber: this.#waveNumber, waveTimes: this.waveTimes, time: this.#clock.time });
    this.#clock.pause();

    this.#inBattle = false;

    this.waveTimes[this.#waveNumber].end = this.#clock.time;

    play_pause_btn.setAttribute("disabled", "ok");
    const onWaveEndEvent = new CustomEvent("on-wave-end", { detail: null });
    document.dispatchEvent(onWaveEndEvent);

    const lastTile = this.tileChain.at(-1)!;
    lastTile.isEnemyEntrance = false;
    this.#waveNumber++;
    console.log("onWaveEnd after", { waveNumber: this.#waveNumber, waveTimes: this.waveTimes, time: this.#clock.time });
  }

  #loopStep(time: number, speed: number) {
    if (this.#inBattle && this.currentWave.every(enemy => enemy.done)) {
      this.#onWaveEnd();
      return;
    }

    const waveStart = this.waveTimes[this.#waveNumber].start;
    const elapsedWaveTime = time - waveStart;

    // console.log(elapsedWaveTime.toFixed(0));

    const spawningEnemies = this.currentWave.filter(enemy => !enemy.spawned && elapsedWaveTime > enemy.delay);

    if (spawningEnemies.length) {
      spawningEnemies.forEach(enemy => {
        this.enemies.push(enemy);
        enemy.spawn();
      });
    }

    for (let tower of this.towers) {
      let elapsedSinceLastShot = this.#clock.time - tower.lastShot;
      let farthestEnemy: Enemy | null = null;
      let greatestProgress = -Infinity;
      let angle: number | null = null;
      let distanceToEnemyInDeg: number | null = null;

      for (let enemy of this.enemies) {
        const d = getDistanceBetweenPoints(tower.pos.x, tower.pos.y, enemy.pos.x, enemy.pos.y);
        const enemyInRange = d < tower.range;
        if (enemyInRange) {
          if (enemy.progress > greatestProgress) {
            greatestProgress = enemy.progress;
            farthestEnemy = enemy;
          }
        }
      }

      const targetEnemy = farthestEnemy; // or other strategies?
      const diff = tower.cooldown - elapsedSinceLastShot;
      const freshCooldown = tower.shotsPerSecond * 60;
      
      if (targetEnemy) {
        angle = getAngle(tower.pos.x, tower.pos.y, targetEnemy.pos.x, targetEnemy.pos.y);
        distanceToEnemyInDeg = getDistanceBetweenAngles(tower.rotation, angle);
        tower.rotateTowardsEnemy(angle);
      }

      const enemyInSight = distanceToEnemyInDeg !== null && distanceToEnemyInDeg < 10;
      
      if (tower.cooldown > 0) {
        tower.cooldown = diff;
      } else if (tower.cooldown <= 0 && targetEnemy && enemyInSight) {
        console.log("SHOOT!");
        tower.cooldown = freshCooldown;
        tower.lastShot = this.#clock.time;
        // const newBullet = createBullet(tower, targetEnemy);
        // G.bullets.push(newBullet);
      }
    }

    {
      // for (let [b, bullet] of G.bullets.entries()) {
      //   bullet.move();
      //   // prettier-ignore
      //   const distance = getDistance(bullet.pos.x, bullet.pos.y, bullet.enemy.pos.x, bullet.enemy.pos.y);
      //   if (distance < bullet.enemy.size) {
      //     // console.log("HIT!", bullet);
      //     // tower.gainXp()
      //     bullet.hit(bullet.enemy);
      //     if (bullet.type === "earth") {
      //       const nearbyEnemies = getNearbyEnemies(bullet, EXPLOSION_RADIUS);
      //       bullet.handleExplosion(nearbyEnemies);
      //     }
      //   }
      // }
    }

    // console.log(this.enemies.map(e => JSON.stringify(e.pos)));

    for (let enemy of this.enemies) {
      enemy.move(speed);
      //   // enemy.move(speed);

      if (enemy.hp <= 0) {
        enemy.die();
      }

      if (enemy.percProgress >= 100) {
        enemy.finish();
      }
    }
  }
}
