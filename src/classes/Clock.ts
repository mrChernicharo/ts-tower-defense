import { play_pause_btn } from "../lib/DOM_elements";

export class Clock {
  #speed = 1;
  #frame = 1;
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

    console.log("play at", { time: this.time, frame: this.#frame, speed: this.#speed });
  }
  pause() {
    this.isPlaying = false;
    play_pause_btn.textContent = "▶️";
    cancelAnimationFrame(this.#frame);
    console.log("paused at", { time: this.time, frame: this.#frame, speed: this.#speed });
  }


  changeSpeed(speed: 1 | 2) {
    console.log("changeSpeed", speed);
    this.#speed = speed;
  }

  step() {
    this.#time = this.#frame * 1.6666;
    // console.log({ t: this.#time, f: this.#frame });

    if (this.#speed === 2 || (this.#speed === 1 && this.#frame % 2 === 0)) {
      this.callback(this.#frame, this.#time);
    }

    if (this.isPlaying) {
      this.#frame = requestAnimationFrame(() => this.step());
    }
  }
}
