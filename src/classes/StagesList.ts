import { stages_list_ul } from "../DOM_elements";

export class StagesList {
  #playerLevel: number;

  constructor(playerLevel: number) {
    this.#playerLevel = playerLevel;
    this.#createLevelsList();
  }

  #createLevelsList() {
    const stagesList = Array(this.#playerLevel)
      .fill(null)
      .map((_, i) => ({
        number: i + 1,
      }));

    stagesList.forEach((item) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <a href="game.html?stage=${item.number}">
          <div id="stage-card-${item.number}" class="stage-card">
            <span>${item.number}</span>
          </div>
        </a>  
      `;
      stages_list_ul.append(li);
    });
  }
}
