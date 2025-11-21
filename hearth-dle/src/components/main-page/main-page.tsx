"use client";

import { useState } from "react";
import { Card } from "@radix-ui/themes";
import { cardSets } from "@/data/card-sets/card-sets";
import { GameMode } from "@/app/types/game-mode";
import { ModeCard } from "./mode-card";

export function MainPage() {
  const [selectedMode, setSelectedMode] = useState<GameMode>("standard");
  const [selectedSeries, setSelectedSeries] = useState<string[]>(["classic"]);
  const [customDialogOpen, setCustomDialogOpen] = useState(false);

  const modes: { gameMode: GameMode; description: string }[] = [
    {
      gameMode: "standard",
      description: "하스스톤 정규 카드들이 문제로 출제됩니다",
    },
    {
      gameMode: "wild",
      description: "하스스톤 야생 카드들이 문제로 출제됩니다",
    },
    {
      gameMode: "custom",
      description: "선택된 확장팩 카드들이 문제로 출제됩니다",
    },
  ];

  // const handleSeriesToggle = (seriesId: string) => {
  //   setSelectedSeries((prev) =>
  //     prev.includes(seriesId)
  //       ? prev.filter((id) => id !== seriesId)
  //       : [...prev, seriesId]
  //   );
  // };

  // const handleSelectAll = () => {
  //   setSelectedSeries(cardSets.map((s) => s.name));
  // };

  // const handleRemoveAll = () => {
  //   setSelectedSeries([]);
  // };

  const handleModeSelect = (mode: GameMode) => {
    setSelectedMode(mode);
    if (mode === "standard") {
      setSelectedSeries(["classic"]);
    } else if (mode === "wild") {
      setSelectedSeries(cardSets.map((s) => s.name));
    } else if (mode === "custom") {
      setCustomDialogOpen(true);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="">DolDle</h1>
        <p className="text-muted-foreground text-lg">
          Choose your game mode and start making decisions
        </p>
      </div>

      {/* Mode Selection */}
      <div className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {modes.map((mode) => (
            <ModeCard
              key={mode.gameMode}
              gameMode={mode.gameMode}
              description={mode.description}
              selectedMode={selectedMode}
              setSelectedMode={setSelectedMode}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
