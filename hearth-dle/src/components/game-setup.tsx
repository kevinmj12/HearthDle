"use client";

import { useState } from "react";
import { Card } from "@radix-ui/themes";

type GameMode = "classic" | "wild" | "custom";

const cardSeries = [
  { id: "classic", name: "Classic", description: "Original Hearthstone cards" },
  {
    id: "goblins",
    name: "Goblins vs Gnomes",
    description: "Mech-focused expansion",
  },
  {
    id: "blackrock",
    name: "Blackrock Mountain",
    description: "Dragon-themed adventure",
  },
  {
    id: "grand",
    name: "The Grand Tournament",
    description: "Inspire mechanics",
  },
  {
    id: "whispers",
    name: "Whispers of the Old Gods",
    description: "Corrupted cards",
  },
  {
    id: "karazhan",
    name: "One Night in Karazhan",
    description: "Party-themed adventure",
  },
  {
    id: "gadgetzan",
    name: "Mean Streets of Gadgetzan",
    description: "Tri-class cards",
  },
  { id: "ungoro", name: "Journey to Un'Goro", description: "Quest cards" },
  {
    id: "frozen",
    name: "Knights of the Frozen Throne",
    description: "Death Knight heroes",
  },
  { id: "kobolds", name: "Kobolds & Catacombs", description: "Dungeon run" },
  { id: "witchwood", name: "The Witchwood", description: "Echo and Rush" },
  { id: "boomsday", name: "The Boomsday Project", description: "Mech warfare" },
];

export function GameSetup() {
  const [selectedMode, setSelectedMode] = useState<GameMode>("classic");
  const [selectedSeries, setSelectedSeries] = useState<string[]>(["classic"]);
  const [customDialogOpen, setCustomDialogOpen] = useState(false);

  const handleSeriesToggle = (seriesId: string) => {
    setSelectedSeries((prev) =>
      prev.includes(seriesId)
        ? prev.filter((id) => id !== seriesId)
        : [...prev, seriesId]
    );
  };

  const handleSelectAll = () => {
    setSelectedSeries(cardSeries.map((s) => s.id));
  };

  const handleRemoveAll = () => {
    setSelectedSeries([]);
  };

  const handleModeSelect = (mode: GameMode) => {
    setSelectedMode(mode);
    if (mode === "classic") {
      setSelectedSeries(["classic"]);
    } else if (mode === "wild") {
      setSelectedSeries(cardSeries.map((s) => s.id));
    } else if (mode === "custom") {
      setCustomDialogOpen(true);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
          Hearthstone Card Decision
        </h1>
        <p className="text-muted-foreground text-lg">
          Choose your game mode and start making decisions
        </p>
      </div>

      {/* Mode Selection */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-foreground">
          Select Game Mode
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Classic Mode */}
          <Card
            className={`p-6 cursor-pointer transition-all hover:border-accent ${
              selectedMode === "classic"
                ? "border-accent border-2 bg-accent/10"
                : "border-border"
            }`}
            onClick={() => handleModeSelect("classic")}
          >
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                {/* <Sparkles className="h-6 w-6 text-primary" /> */}
              </div>
              <h3 className="text-xl font-bold text-foreground">Classic</h3>
              <p className="text-sm text-muted-foreground">
                Original Hearthstone cards from the Classic set
              </p>
            </div>
          </Card>

          {/* Wild Mode */}
          <Card
            className={`p-6 cursor-pointer transition-all hover:border-accent ${
              selectedMode === "wild"
                ? "border-accent border-2 bg-accent/10"
                : "border-border"
            }`}
            onClick={() => handleModeSelect("wild")}
          >
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="h-12 w-12 rounded-full bg-accent/20 flex items-center justify-center">
                {/* <Swords className="h-6 w-6 text-accent" /> */}
              </div>
              <h3 className="text-xl font-bold text-foreground">Wild</h3>
              <p className="text-sm text-muted-foreground">
                All cards from every expansion and adventure
              </p>
            </div>
          </Card>

          {/* Custom Mode */}
          <Card
            className={`p-6 cursor-pointer transition-all hover:border-accent ${
              selectedMode === "custom"
                ? "border-accent border-2 bg-accent/10"
                : "border-border"
            }`}
            onClick={() => handleModeSelect("custom")}
          >
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="h-12 w-12 rounded-full bg-chart-3/20 flex items-center justify-center">
                {/* <Sparkles className="h-6 w-6 text-chart-3" /> */}
              </div>
              <h3 className="text-xl font-bold text-foreground">Custom</h3>
              <p className="text-sm text-muted-foreground">
                Choose specific card series to include
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
