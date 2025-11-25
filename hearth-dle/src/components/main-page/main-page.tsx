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

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { LuBookOpen, LuPlay } from "react-icons/lu";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

export function MainPage() {
  const [selectedMode, setSelectedMode] = useState<GameMode>("standard");
  const [selectedCardSets, setSelectedCardSets] = useState<
    { id: number; name: string }[]
  >(
    classicCardSets.map((e) => ({
      id: e.id,
      name: e.name,
    }))
  );

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
      setSelectedCardSets(
        classicCardSets.map((e) => ({ id: e.id, name: e.name }))
      );
    } else if (mode === "wild") {
      setSelectedCardSets(
        wildCardSets.map((e) => ({ id: e.id, name: e.name }))
      );
    } else if (mode === "custom") {
    }
  };

  return (
    <div className="w-full my-8">
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
            {modes.map((mode) =>
              mode.gameMode !== "custom" ? (
                <ModeCard
                  key={mode.gameMode}
                  gameMode={mode.gameMode}
                  description={mode.description}
                  selectedMode={selectedMode}
                  setSelectedMode={handleModeSelect}
                />
              ) : (
                <Dialog key={mode.gameMode}>
                  <DialogTrigger asChild>
                    <div>
                      <ModeCard
                        key={mode.gameMode}
                        gameMode={mode.gameMode}
                        description={mode.description}
                        selectedMode={selectedMode}
                        setSelectedMode={handleModeSelect}
                      />
                    </div>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px] max-h-[600px] bg-white p-0 flex flex-col">
                    {/* Header - 고정 */}
                    <DialogHeader className="pl-6 pt-6">
                      <DialogTitle>원하는 확장팩을 선택하세요!</DialogTitle>
                    </DialogHeader>

                    {/* 가운데 스크롤 영역 */}
                    <div className="flex-1 px-6 py-2 overflow-y-auto">
                      <ul className="list-disc flex flex-col gap-5">
                        {wildCardSets.map((e) => (
                          <div key={e.id} className="flex items-center gap-3">
                            <Checkbox id={e.name} />
                            <Label htmlFor={e.name} className="text-[16px]">
                              {e.name}
                            </Label>
                          </div>
                        ))}
                      </ul>
                    </div>

                    {/* Footer - 고정 */}
                    <DialogFooter className="px-6 pb-6">
                      <DialogClose asChild>
                        <Button variant="ghost">취소</Button>
                      </DialogClose>
                      <Button variant="ghost">저장</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )
            )}
          </div>
        </div>
      </div>

      {/* 놀이 방법, 게임 시작 */}
      <div className="flex flex-row justify-center items-center mt-12 text-[#614326] text-xl gap-8">
        <div className="flex flex-row gap-3 items-center cursor-pointer hover:bg-accent/20 border-2 border-[#614326] rounded-md px-4 py-3">
          <LuBookOpen />
          게임 방법
        </div>
        <div className="flex flex-row gap-3 items-center cursor-pointer hover:bg-[#ad4a32] border-2 border-[#8e2a11] rounded-md px-4 py-3 bg-[#8e2a11] text-white">
          <LuPlay />
          게임 시작
        </div>
      </div>

      {/* 선택된 모드 안내 */}
      <div className="flex flex-row justify-center items-center mt-12 text-2xl text-[#614326]">
        <p>모드: {modeNames[selectedMode].name}</p>
        <p className="ml-8">확장팩: {selectedCardSets.length}개 선택됨</p>
        <Dialog>
          <DialogTrigger asChild>
            <FaRegQuestionCircle className="ml-2 cursor-pointer" />
          </DialogTrigger>

          <DialogContent className="sm:max-w-[500px] max-h-[350px] bg-white p-0 flex flex-col">
            <DialogHeader className="pl-6 pt-6">
              <DialogTitle>
                {selectedCardSets.length}개의 확장팩이 선택되었습니다!
              </DialogTitle>
            </DialogHeader>

            {/* 가운데 스크롤 영역 */}
            <div className="flex-1 px-5 overflow-y-auto">
              <ul className="list-disc py-2 px-5 flex flex-col gap-3">
                {selectedCardSets.map((e) => (
                  <li key={e.id}>{e.name}</li>
                ))}
              </ul>
            </div>

            <DialogFooter className="px-6 pb-6">
              <DialogClose asChild>
                <Button variant="ghost">취소</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
