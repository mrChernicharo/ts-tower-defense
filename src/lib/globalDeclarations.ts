import { RingMenuType } from "../classes/RingMenu";
import { Tile } from "../classes/Tile";

interface CustomEventMap {
  "tile-clicked": CustomEvent<Tile>;
  "show-ring-menu": CustomEvent<Tile>;
  "hide-ring-menu": CustomEvent<null>;
  "on-wave-end": CustomEvent<null>;
  "ring-menu-button-click": CustomEvent<{ e: MouseEvent; menuType: RingMenuType; }>;
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
