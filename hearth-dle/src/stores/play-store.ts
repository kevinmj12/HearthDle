import { Card } from "@/types/card";
import { GuessResult } from "@/types/play";
import { create } from "zustand";

export type TCardSets = { id: number; name: string };

interface PlayStore {
  answer: Card | null;
  guesses: GuessResult[];
  isWon: boolean;
  usedCards: Set<string>;
  setAnswer: (card: Card) => void;
  setGuesses: (guessList: GuessResult[]) => void;
  addGuess: (newGuess: GuessResult) => void;
  setIsWon: (isWon: boolean) => void;
  setUsedCards: (usedCardsSet: Set<string>) => void;
}

const usePlayStore = create<PlayStore>((set, get) => ({
  answer: null,
  guesses: [],
  isWon: false,
  usedCards: new Set(),
  setAnswer: (card) => {
    set({ answer: card });
  },
  setGuesses: (guessList) => {
    set({ guesses: guessList });
  },
  addGuess: (newGuess) => {
    const { guesses } = get();
    if (guesses.length) {
      guesses[0].isNew = false;
    }
    const newGuesses = [newGuess, ...guesses];
    set({ guesses: newGuesses });
  },
  setIsWon: (isWon) => {
    set({ isWon: isWon });
  },
  setUsedCards: (usedCardsSet) => {
    set({ usedCards: usedCardsSet });
  },
}));

export default usePlayStore;
