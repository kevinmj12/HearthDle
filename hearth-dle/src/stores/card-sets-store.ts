import { standardCardSets } from "@/data/card-sets/standard-card-sets";
import { wildCardSets } from "@/data/card-sets/wild-card-sets";
import { create } from "zustand";

export type TCardSets = { id: number; name: string };

interface CardSetsStore {
  selectedCardSets: TCardSets[];
  toggleSelectedCardSets: (id: number) => void;
  removeSelectedCardSets: (id: number) => void;
  setSelectedCardSetsStandard: () => void;
  setSelectedCardSetsWild: () => void;
  sortSelectedCardSets: () => void;
}

const useCardSetsStore = create<CardSetsStore>((set, get) => ({
  selectedCardSets: standardCardSets,
  toggleSelectedCardSets: (id) => {
    const { selectedCardSets } = get();
    const exists = selectedCardSets.some((c) => c.id === id);

    if (exists) {
      // 선택되어 있는 경우
      set({
        selectedCardSets: selectedCardSets.filter((c) => c.id !== id),
      });
    } else {
      // 선택되어 있지 않은 경우
      const card = wildCardSets.find((c) => c.id === id);
      if (card) {
        set({
          selectedCardSets: [...selectedCardSets, card],
        });
      }
    }
  },
  removeSelectedCardSets: (id: number) => {
    const { selectedCardSets } = get();
    set({
      selectedCardSets: selectedCardSets.filter((c) => c.id !== id),
    });
  },
  setSelectedCardSetsStandard: () =>
    set({
      selectedCardSets: standardCardSets,
    }),
  setSelectedCardSetsWild: () => {
    set({ selectedCardSets: wildCardSets });
  },
  sortSelectedCardSets: () => {
    const { selectedCardSets } = get();
    const sorted = [...selectedCardSets].sort((a, b) => a.id - b.id);
    set({ selectedCardSets: sorted });
  },
}));

export default useCardSetsStore;
