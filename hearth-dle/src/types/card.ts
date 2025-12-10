export interface Card {
  packs: string;
  name: string;
  mana: number;
  class: string;
  attack: number | null;
  health: number | null;
  type: string;
  rarity: string;
  keywords: string[];
  minionType: string[];
  spellSchool: string[];
  imagePath: string;
}
