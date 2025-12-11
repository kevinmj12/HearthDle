"use client";

import { useEffect } from "react";
import { AutocompleteInput } from "./auto-complete-input";
import { GuessResult, THint } from "@/types/play";
import cards from "@/data/cards/cards.json";
import { cn } from "@/lib/utils";
import { ArrayHintCell } from "./array-hint-cell";
import { HintCell } from "./hint-cell";
import usePlayStore from "@/stores/play-store";
import Image from "next/image";
import hearthstone from "@/assets/images/hearthstone.jpg";
import { hintCellBgColor } from "./hint-cell-bg-color";
import { HintHeaderCell } from "./hint-header-cell";

function compareArrays(guessed: string[], answer: string[]): THint {
  if (guessed.length === 0 && answer.length === 0) return "correct";
  if (guessed.length === 0 || answer.length === 0) return "wrong";

  //   const guessedSet = new Set(guessed);
  const answerSet = new Set(answer);

  const allMatch =
    guessed.length === answer.length &&
    guessed.every((item) => answerSet.has(item));

  if (allMatch) return "correct";

  const hasPartial = guessed.some((item) => answerSet.has(item));
  return hasPartial ? "partial" : "wrong";
}

function compareNumbers(guessed: number | null, answer: number | null): THint {
  if (guessed === null && answer === null) return "correct";
  if (guessed === null || answer === null) return "wrong";
  if (guessed === answer) return "correct";
  return guessed < answer ? "higher" : "lower";
}

export function Play() {
  const {
    answer,
    guesses,
    isWon,
    usedCards,
    setAnswer,
    setGuesses,
    addGuess,
    setIsWon,
    setUsedCards,
  } = usePlayStore();

  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    const randomIndex = Math.floor(Math.random() * cards.length);
    setAnswer(cards[randomIndex]);
    setGuesses([]);
    setIsWon(false);
    setUsedCards(new Set());
  };

  const handleGuess = (cardName: string) => {
    if (!answer || isWon) return;

    const guessedCard = cards.find((c) => c.name === cardName);
    if (!guessedCard) return;

    if (usedCards.has(cardName)) return;
    const newUsedCards = usedCards.add(cardName);
    setUsedCards(newUsedCards);

    const hints: GuessResult["hints"] = {
      packs: guessedCard.packs === answer.packs ? "correct" : "wrong",
      mana: compareNumbers(guessedCard.mana, answer.mana),
      class: guessedCard.class === answer.class ? "correct" : "wrong",
      attack: compareNumbers(guessedCard.attack, answer.attack),
      health: compareNumbers(guessedCard.health, answer.health),
      type: guessedCard.type === answer.type ? "correct" : "wrong",
      rarity: guessedCard.rarity === answer.rarity ? "correct" : "wrong",
      keywords: compareArrays(guessedCard.keywords, answer.keywords),
      minionType: compareArrays(guessedCard.minionType, answer.minionType),
      spellSchool: compareArrays(guessedCard.spellSchool, answer.spellSchool),
    };

    const newGuess: GuessResult = { card: guessedCard, hints, isNew: true };
    addGuess(newGuess);

    if (guessedCard.name === answer.name) {
      setIsWon(true);
    }
  };

  const availableCards = cards
    .filter((c) => !usedCards.has(c.name))
    .map((c) => c.name);

  const classNameMap: Record<string, string> = {
    deathknight: "죽음의 기사",
    demonhunter: "악마사냥꾼",
    druid: "드루이드",
    hunter: "사냥꾼",
    mage: "마법사",
    paladin: "성기사",
    priest: "사제",
    rogue: "도적",
    shaman: "주술사",
    warlock: "흑마법사",
    warrior: "전사",
    neutral: "중립",
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-4xl mx-auto">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-foreground mb-2">
          하스스톤 카드 맞추기
        </h1>
        <p className="text-muted-foreground">
          카드 이름을 입력해서 정답 카드를 맞춰보세요!
        </p>
      </div>
      {isWon ? (
        <div className="flex flex-col items-center gap-4 p-6 bg-green-500/10 rounded-xl border border-green-500">
          <h2 className="text-xl font-bold text-green-500">정답입니다!</h2>
          <Image
            className="object-contain"
            src={answer !== null ? answer.imagePath : hearthstone}
            alt={answer !== null ? answer.name : "이름을 불러올 수 없습니다"}
            width={300}
            height={300}
          />
          <p className="text-lg font-medium">{answer?.name}</p>
          <button
            onClick={startNewGame}
            className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            새 게임
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <AutocompleteInput
            suggestions={availableCards}
            placeholder="카드 이름을 입력하세요..."
            onSelect={handleGuess}
            clearOnSelect
          />
          <p className="text-sm text-muted-foreground">
            시도 횟수: {guesses.length}
          </p>
        </div>
      )}
      {guesses.length > 0 && (
        <div className="flex w-[800px] overflow-x-scroll">
          <div className="flex flex-col gap-2 min-w-fit mx-auto">
            {/* 헤더 */}
            <div className="grid grid-cols-11 gap-2 text-xs font-medium text-muted-foreground text-center text-[15px]">
              <HintHeaderCell name="카드" />
              <HintHeaderCell name="확장팩" />
              <HintHeaderCell name="마나" />
              <HintHeaderCell name="직업" />
              <HintHeaderCell name="공격" />
              <HintHeaderCell name="체력" />
              <HintHeaderCell name="유형" />
              <HintHeaderCell name="희귀도" />
              <HintHeaderCell name="키워드" />
              <HintHeaderCell name="종족" />
              <HintHeaderCell name="속성" />
            </div>

            {/* 추측한 카드 목록 */}
            {guesses.map((guess, index) => (
              <div
                key={`${guess.card.name}-${index}`}
                className={cn(
                  "grid grid-cols-11 gap-2 items-center justify-center"
                  //   guess.isNew && "animate-in slide-in-from-top-4 duration-300"
                )}
              >
                <div
                  className={cn(
                    "relative items-center justify-center",
                    "w-[60px] h-[60px] overflow-hidden",
                    guess.isNew && "animate-in zoom-in-50 duration-300"
                  )}
                >
                  <Image
                    className="object-cover object-[1.5px_-10px]  scale-160 origin-top"
                    src={guess !== null ? guess.card.imagePath : hearthstone}
                    alt={guess.card.name}
                    fill
                  />
                </div>
                <HintCell
                  value={guess.card.packs}
                  status={guess.hints.packs}
                  animate={guess.isNew}
                />
                <HintCell
                  value={guess.card.mana}
                  status={guess.hints.mana}
                  isNumeric
                  animate={guess.isNew}
                />
                <HintCell
                  value={classNameMap[guess.card.class] || guess.card.class}
                  status={guess.hints.class}
                  animate={guess.isNew}
                />
                <HintCell
                  value={guess.card.attack}
                  status={guess.hints.attack}
                  isNumeric
                  animate={guess.isNew}
                />
                <HintCell
                  value={guess.card.health}
                  status={guess.hints.health}
                  isNumeric
                  animate={guess.isNew}
                />
                <HintCell
                  value={guess.card.type}
                  status={guess.hints.type}
                  animate={guess.isNew}
                />
                <HintCell
                  value={guess.card.rarity}
                  status={guess.hints.rarity}
                  animate={guess.isNew}
                />
                <ArrayHintCell
                  values={guess.card.keywords}
                  status={guess.hints.keywords}
                  animate={guess.isNew}
                />
                <ArrayHintCell
                  values={guess.card.minionType}
                  status={guess.hints.minionType}
                  animate={guess.isNew}
                />
                <ArrayHintCell
                  values={guess.card.spellSchool}
                  status={guess.hints.spellSchool}
                  animate={guess.isNew}
                />
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="text-xs text-muted-foreground flex flex-wrap justify-center gap-4 mt-4">
        <span className="flex items-center gap-1">
          <span
            className={`w-3 h-3 ${hintCellBgColor["correct"]} rounded`}
          ></span>{" "}
          정답
        </span>
        <span className="flex items-center gap-1">
          <span
            className={`w-3 h-3 ${hintCellBgColor["wrong"]} rounded`}
          ></span>{" "}
          오답
        </span>
        <span className="flex items-center gap-1">
          <span
            className={`w-3 h-3 ${hintCellBgColor["higher"]} rounded`}
          ></span>{" "}
          높거나 낮음
        </span>
        <span className="flex items-center gap-1">
          <span
            className={`w-3 h-3 ${hintCellBgColor["partial"]} rounded`}
          ></span>{" "}
          부분 일치
        </span>
      </div>
    </div>
  );
}
