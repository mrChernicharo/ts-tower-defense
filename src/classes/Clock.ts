import { play_pause_btn } from "../lib/DOM_elements";

const frameTime = 1000 / 60;

export class Clock {
  #speed = 1;
  #frame = 0;
  #time = 0;
  isPlaying = false;
  callback: (...arg: any) => void;
  constructor(callback: any) {
    this.callback = callback;
  }
  get speed() {
    return this.#speed.valueOf();
  }

  get time() {
    return this.#time.valueOf();
  }

  play() {
    this.isPlaying = true;
    play_pause_btn.textContent = "⏸";
    this.step();
  }

  pause() {
    this.isPlaying = false;
    play_pause_btn.textContent = "▶️";
    cancelAnimationFrame(this.#frame);
  }

  changeSpeed(speed: 1 | 2 | 4) {
    this.#speed = speed;
    console.log("changed speed", speed);
  }

  step() {
    const timeIncrement = (frameTime * this.#speed) / 1000;
    this.#time += timeIncrement;

    if (this.isPlaying) {
      this.callback(this.#time, this.#speed);

      this.#frame = requestAnimationFrame(() => this.step());
    }
  }
}
