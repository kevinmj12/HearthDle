import { Card } from "./card";

export type THint = "correct" | "wrong" | "higher" | "lower" | "partial";

export interface GuessResult {
  card: Card;
  hints: {
    packs: THint;
    mana: THint;
    class: THint;
    attack: THint;
    health: THint;
    type: THint;
    rarity: THint;
    keywords: THint;
    minionType: THint;
    spellSchool: THint;
  };
  isNew?: boolean;
}
