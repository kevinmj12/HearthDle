"use client";

import { useState } from "react";
import { classicCardSets } from "@/data/card-sets/classic-card-sets";
import { wildCardSets } from "@/data/card-sets/wild-card-sets";
import { GameMode } from "@/app/types/game-mode";
import { ModeCard } from "./mode-card";
import Image from "next/image";
import headerTop from "@/app/assets/images/doldle-header-top.png";
import headerBottom from "@/app/assets/images/doldle-header-bottom.png";
import { modeNames } from "@/data/mode-info/mode-names";
import { FaRegQuestionCircle } from "react-icons/fa";

export function MainPage() {
  const [selectedMode, setSelectedMode] = useState<GameMode>("standard");
  const [selectedCardSets, setSelectedCardSets] = useState<string[]>(
    classicCardSets.map((e) => e.name)
  );
  const [customDialogOpen, setCustomDialogOpen] = useState(false);
  const [cardSetsDialogOpen, setCardSetsDialogOpen] = useState(false);

  const modes: { gameMode: GameMode; description: string }[] = [
    {
      gameMode: "standard",
      description: "정규 카드들이 문제로 출제됩니다",
    },
    {
      gameMode: "wild",
      description: "야생 카드들이 문제로 출제됩니다",
    },
    {
      gameMode: "custom",
      description: "범위를 설정할 수 있습니다",
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
      setSelectedMode("standard");
      setSelectedCardSets(classicCardSets.map((e) => e.name));
    } else if (mode === "wild") {
      setSelectedCardSets(wildCardSets.map((e) => e.name));
    } else if (mode === "custom") {
      setCustomDialogOpen(true);
    }
  };

  return (
    <div className="w-full mt-8">
      {/* 헤더 */}
      <div className="text-center mb-20 bg-[url('/images/doldle-header-middle.jpg')]">
        <Image
          src={headerTop}
          alt="top"
          className="relative w-full h-16 background"
        />
        <h1 className="text-5xl text-white mb-7">DolDle</h1>
        <p className="text-2xl text-white">하스스톤 카드를 맞혀보세요!</p>
        <Image
          src={headerBottom}
          alt="bottom"
          className="relative w-full h-16"
        />
      </div>

      {/* 모드 선택 */}
      <div className="container px-4 mx-auto max-w-5xl text-[#614326]">
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {modes.map((mode) => (
              <ModeCard
                key={mode.gameMode}
                gameMode={mode.gameMode}
                description={mode.description}
                selectedMode={selectedMode}
                setSelectedMode={handleModeSelect}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 선택된 모드 안내 */}
      <div className="flex flex-row justify-center items-center mt-12 text-2xl text-[#614326]">
        <p>모드: {modeNames[selectedMode].name}</p>
        <p className="ml-8">확장팩: {selectedCardSets.length}개 선택됨</p>
        <FaRegQuestionCircle className="ml-2" />
      </div>
    </div>
  );
}
