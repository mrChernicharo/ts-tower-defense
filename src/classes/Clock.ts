import { play_pause_btn } from "../lib/DOM_elements";

let counter = 1;
export class Clock {
  #speed = 1;
  #frame = 1;
  #time = 0;
  isPlaying = false;
  callback: (...arg: any) => void;
  constructor(callback: any) {
    this.callback = callback;
  }

  get time() {
    return this.#time;
  }

  play() {
    this.isPlaying = true;
    play_pause_btn.textContent = "⏸";

    this.step();
  }
  pause() {
    console.log("paused at", this.time);
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
    this.#time = this.#frame * 1.6666;
    if (
      this.#speed === 4 ||
      (this.#speed === 2 && this.#frame % 2 === 0) ||
      (this.#speed === 1 && this.#frame % 4 === 0)
    ) {
      this.callback(this.#frame, this.#time, counter);
      counter++;
    }

    this.#frame = requestAnimationFrame(() => this.step());
  }
}
