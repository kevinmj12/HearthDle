"use client";

import { useState } from "react";
import { cardSets } from "@/data/card-sets/card-sets";
import { GameMode } from "@/app/types/game-mode";
import { ModeCard } from "./mode-card";
import Image from "next/image";
import headerTop from "@/app/assets/images/doldle-header-top.png";
import headerMiddle from "@/app/assets/images/doldle-header-middle.jpg";
import headerBottom from "@/app/assets/images/doldle-header-bottom.png";

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
    <div className="w-full mt-8">
      {/* Header */}
      <div className="text-center mb-20 bg-[url('/images/doldle-header-middle.jpg')]">
        <Image src={headerTop} alt="top" className="relative w-full h-16" />
        <h1 className="text-5xl text-white mb-7">DolDle</h1>
        <p className="text-2xl text-white">하스스톤 카드를 맞혀보세요!</p>
        <Image
          src={headerBottom}
          alt="bottom"
          className="relative w-full h-16"
        />
      </div>

      {/* Mode Selection */}
      <div className="container px-4 mx-auto max-w-5xl">
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
    </div>
  );
}
