import { GameMode } from "@/types/game-mode";
import standardImg from "@/assets/icons/standard.svg";
import wildImg from "@/assets/icons/wild.svg";
import customImg from "@/assets/icons/custom.svg";

export const modeNames: Record<GameMode, { name: string; img: string }> = {
  standard: { name: "정규", img: standardImg },
  wild: { name: "야생", img: wildImg },
  custom: { name: "커스텀", img: customImg },
};
