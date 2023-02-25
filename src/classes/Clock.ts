import { play_pause_btn } from "../lib/DOM_elements";

let counter = 0;
export class Clock {
  #speed = 1;
  #frame = 1;
  isPlaying = false;
  callback: (...arg: any) => void;
  constructor(callback: any) {
    this.callback = callback;
  }

  play() {
    this.isPlaying = true;
    play_pause_btn.textContent = "⏸";

    this.step();
  }
  pause() {
    cancelAnimationFrame(this.#frame);
    this.isPlaying = false;
    play_pause_btn.textContent = "▶️";
  }
  reset() {
    this.#frame = 0;
    this.isPlaying = false;
    counter = 0;
  }

  changeSpeed(speed: 1 | 2 | 4) {
    console.log("changeSpeed", speed);
    this.#speed = speed;
    counter = 0;
  }

  step() {
    if (
      this.#speed === 4 ||
      (this.#speed === 2 && this.#frame % 2 === 0) ||
      (this.#speed === 1 && this.#frame % 4 === 0)
    ) {
      this.callback(this.#frame, counter);
      counter++;
    }

    this.#frame = requestAnimationFrame(() => this.step());
  }
}
