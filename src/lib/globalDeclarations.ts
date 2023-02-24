import { Tile } from "../classes/Tile";

interface CustomEventMap {
  "tile-clicked": CustomEvent<Tile>;
  "show-ring-menu": CustomEvent<Tile>;
  "hide-ring-menu": CustomEvent<null>;
  
}
//adds definition to Document
declare global {
  interface Document {
    addEventListener<K extends keyof CustomEventMap>(
      type: K,
      listener: (this: Document, ev: CustomEventMap[K]) => void
    ): void;
    dispatchEvent<K extends keyof CustomEventMap>(ev: CustomEventMap[K]): void;
  }
}

export {};
