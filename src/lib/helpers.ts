import { EnemyLane, Pos, Tile } from "../classes/Tile";
import { TILE_WIDTH } from "./constants";

export function generateUUID(digits: number) {
  let str = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVXZ";
  let uuid: string[] = [];
  for (let i = 0; i < digits; i++) {
    uuid.push(str[Math.floor(Math.random() * str.length)]);
  }
  return uuid.join("");
}

export function getStageNumberFromUrl() {
  const urlParams = new URLSearchParams(location.search);

  for (const [k, v] of urlParams.entries()) {
    if (k === "stage" && v) {
      return Number(v);
    }
  }
  return 1;
}

export function drawPath(points: Pos[], lane: EnemyLane, hasEnemyEntrance: boolean) {
  let d = "";
  let prevPos: Pos | null = null;

  for (const [i, pos] of points.entries()) {
    if (i === 0) {
      // moveTo
      d = `M ${pos.x} ${pos.y}`;
    }
    // line
    if (prevPos?.x === pos.x || prevPos?.y === pos.y) {
      d += ` L ${pos.x} ${pos.y}`;
    }
    // bezier
    if (prevPos) {
      if (prevPos.y % TILE_WIDTH === 0) {
        // "from the top to the left/right"
        d += `
          M ${prevPos.x} ${prevPos.y} 
          C ${prevPos.x} ${prevPos.y + (pos.y - prevPos.y) / 2} ${pos.x + (prevPos.x - pos.x) / 2} ${pos.y} 
          ${pos.x} ${pos.y} `;
      } else {
        // "from the left/right to the bottom"
        d += ` 
          M ${prevPos.x} ${prevPos.y} 
          C ${pos.x + (prevPos.x - pos.x) / 2} ${prevPos.y} ${pos.x} ${pos.y + (prevPos.y - pos.y) / 2} 
          ${pos.x} ${pos.y}
          `;
      }
    }
    prevPos = pos;
  }

  if (hasEnemyEntrance) {
    let entryPos = { x: 0, y: 0 };
    const firstTileEntry = points.at(-1)!;

    entryPos.x = firstTileEntry.x;
    entryPos.y = firstTileEntry.y + TILE_WIDTH * 0.5;

    if (lane === "left") {
      entryPos.x += TILE_WIDTH * 0.25;
    }
    if (lane === "right") {
      entryPos.x -= TILE_WIDTH * 0.25;
    }

    d += ` L ${entryPos.x} ${entryPos.y}`;
  }
  return d;
}

// export function drawPathEntrance(tile: Tile, points: Pos[], lane: EnemyLane) {
//   if (!tile.isEnemyEntrance) return

//     let entryPos = { x: 0, y: 0 };
//     const firstTileEntry = points.at(-1)!;

//     entryPos.x = firstTileEntry.x;
//     entryPos.y = firstTileEntry.y + TILE_WIDTH * 0.5;

//     if (lane === "left") {
//       entryPos.x += TILE_WIDTH * 0.25;
//     }
//     if (lane === "right") {
//       entryPos.x -= TILE_WIDTH * 0.25;
//     }

//     d += ` L ${entryPos.x} ${entryPos.y}`;
// }

// const hasEnemyEntrance = G.tileChain.at(-1)?.enemyEntrance;
// if (hasEnemyEntrance) {
//   let entryPos = { x: 0, y: 0 };
//   const firstTileEntry = points.at(-1);

//   entryPos.x = firstTileEntry.x;
//   entryPos.y = firstTileEntry.y + TILE_WIDTH * 0.5;

//   if (lane === "left") {
//     entryPos.x += TILE_WIDTH * 0.25;
//   }
//   if (lane === "right") {
//     entryPos.x -= TILE_WIDTH * 0.25;
//   }

//   d += ` L ${entryPos.x} ${entryPos.y}`;
// }

// prev = 100 25 | pos = 25 100
// M 100 25 C [62,5  25]  [25  62,5]   25 100

//x 62,5 = prev.x - (( prev.x - pos.x ) / 2)
//y 62,5 = pox.y + ((prev.y - pos.y ) / 2)

// 62,5 = 100 - 37,5

// TL ==> // M 50 0 C 50 25 25 50 0 50 M 25 0 C 25 15 15 25 0 25 M 75 0 C 75 50 50 75 0 75
// TR ==> // M 50 0 C 50 25 75 50 100 50 M 25 0 C 25 50 50 75 100 75 M 75 0 C 75 15 85 25 100 25
// RB ==> // M 50 100 C 50 75 75 50 100 50 M 75 100 C 75 85 85 75 100 75 M 25 100 C 25 50 50 25 100 25
// LB ==> // M 50 100 C 50 75 25 50 0 50 M 75 100 C 75 50 50 25 0 25 M 25 100 C 25 85 15 75 0 75
