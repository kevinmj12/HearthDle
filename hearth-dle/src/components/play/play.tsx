"use client";

import { useState } from "react";
import { GameMode } from "@/types/game-mode";
import { modeNames } from "@/data/mode-info/mode-names";
import { FaRegQuestionCircle } from "react-icons/fa";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { LuBookOpen, LuPlay } from "react-icons/lu";
import useCardSetsStore from "@/stores/card-sets-store";
import { useRouter } from "next/navigation";

export function Play() {
  const router = useRouter();

  const {
    selectedCardSets,
    removeSelectedCardSets,
    setSelectedCardSetsStandard,
    setSelectedCardSetsWild,
  } = useCardSetsStore();
  const [selectedMode, setSelectedMode] = useState<GameMode>("standard");

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

  const handleModeSelect = (mode: GameMode) => {
    setSelectedMode(mode);
    if (mode === "standard") {
      setSelectedMode("standard");
      setSelectedCardSetsStandard();
    } else if (mode === "wild") {
      setSelectedCardSetsWild();
    } else if (mode === "custom") {
      removeSelectedCardSets(2); // 핵심 id 제거
    }
  };

  return (
    <div className="w-full my-8">
      {/* 놀이 방법, 게임 시작 */}
      <div className="flex flex-row justify-center items-center mt-12 text-[#614326] text-xl gap-8">
        <div className="flex flex-row gap-3 items-center cursor-pointer hover:bg-accent/20 border-2 border-[#614326] rounded-md px-4 py-3">
          <LuBookOpen />
          게임 방법
        </div>

        <div
          className="flex flex-row gap-3 items-center cursor-pointer hover:border-[#ad4a32] hover:bg-[#ad4a32] border-2 border-[#8e2a11] rounded-md px-4 py-3 bg-[#8e2a11] text-white"
          onClick={() => router.push("/play")}
        >
          <LuPlay />
          게임 시작
        </div>
      </div>
    </div>
  );
}
