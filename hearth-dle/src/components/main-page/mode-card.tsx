import { GameMode } from "@/app/types/game-mode";
import { Card } from "@radix-ui/themes";
import standardImg from "@/app/assets/icons/standard.svg";
import wildImg from "@/app/assets/icons/wild.svg";
import customImg from "@/app/assets/icons/custom.svg";
import Image from "next/image";

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
  const modeNames: Record<GameMode, { name: string; img: string }> = {
    standard: { name: "정규", img: standardImg },
    wild: { name: "야생", img: wildImg },
    custom: { name: "커스텀", img: customImg },
  };

  return (
    <Card
      className={`p-6 cursor-pointer transition-all hover:border-accent ${
        selectedMode === gameMode
          ? "border-accent border-2 bg-accent/10"
          : "border-border"
      }`}
      onClick={() => setSelectedMode(gameMode)}
    >
      <div className="flex flex-col items-center text-center space-y-3">
        <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
          <Image src={modeNames[gameMode].img} alt={modeNames[gameMode].name} />
        </div>
        <h3 className="text-xl font-bold text-foreground">
          {modeNames[gameMode].name}
        </h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </Card>
  );
}
