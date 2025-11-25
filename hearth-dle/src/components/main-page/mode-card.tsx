import { GameMode } from "@/app/types/game-mode";
import { modeNames } from "@/data/mode-info/mode-names";

import Image from "next/image";
import { FaRegQuestionCircle } from "react-icons/fa";

interface ModeCardProps {
  gameMode: GameMode;
  description: string;
  selectedMode: GameMode;
  setSelectedMode: (mode: GameMode) => void;
}

export function ModeCard({
  gameMode,
  description,
  selectedMode,
  setSelectedMode,
}: ModeCardProps) {
  return (
    <div
      className={`p-6 cursor-pointer transition-all border-[#614326] ${
        selectedMode === gameMode ? "border-3 bg-accent/10" : "hover:border-2"
      }`}
      onClick={() => setSelectedMode(gameMode)}
    >
      <div className="flex flex-col items-center text-center space-y-3">
        <div className="h-12 w-12 rounded-full  flex items-center justify-center">
          <Image src={modeNames[gameMode].img} alt={modeNames[gameMode].name} />
        </div>
        <h3 className="text-2xl font-bold">{modeNames[gameMode].name}</h3>
        <p className="text-l text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
