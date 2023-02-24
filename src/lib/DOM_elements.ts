export const svg = document.querySelector('svg')!;
export const scene = document.querySelector('g#scene')!;
export const tiles_g = document.querySelector('g#tiles-g')!;
export const towers_g = document.querySelector('g#towers-g')!;
export const bullets_g = document.querySelector('g#bullets-g')!;
export const enemies_g = document.querySelector('g#enemies-g')!;
export const ring_menu_g = document.querySelector('g#ring-menu-g')!;


export const player_id_div = document.querySelector("#player-id-div") as HTMLDivElement;
export const player_level_div = document.querySelector("#player-level-div") as HTMLDivElement;
export const player_stars_div = document.querySelector("#player-stars-div") as HTMLDivElement;

export const stage_name_span = document.querySelector("#stage-name-span") as HTMLSpanElement;
export const stage_number_span = document.querySelector("#stage-number-span") as HTMLSpanElement;

export const levelUpBtn = document.querySelector("#level-up-btn") as HTMLButtonElement;
export const addStarsBtn = document.querySelector("#add-stars-btn") as HTMLButtonElement;
export const spend5StarsBtn = document.querySelector("#spend-stars-btn") as HTMLButtonElement;

export const stages_list_ul = document.querySelector("#stages-list-ul") as HTMLUListElement;

export const enemy_lane_paths = {
  left: document.querySelector("#enemy-lane-left")!,
  center: document.querySelector("#enemy-lane-center")!,
  right: document.querySelector("#enemy-lane-right")!,
};