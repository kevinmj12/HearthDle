"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface AutocompleteInputProps {
  suggestions: string[];
  placeholder?: string;
  onSelect?: (value: string) => void;
  clearOnSelect?: boolean;
}

export function AutocompleteInput({
  suggestions,
  placeholder = "Type to search...",
  onSelect,
  clearOnSelect = false,
}: AutocompleteInputProps) {
  const [inputValue, setInputValue] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [isComposing, setIsComposing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (inputValue.trim() === "") {
      setFilteredSuggestions([]);
      setIsOpen(false);
      return;
    }

    const searchTerm = inputValue.toLowerCase();

    const filtered = suggestions
      .filter((suggestion) => suggestion.toLowerCase().includes(searchTerm))
      .sort((a, b) => {
        const aLower = a.toLowerCase();
        const bLower = b.toLowerCase();
        const aStartsWith = aLower.startsWith(searchTerm);
        const bStartsWith = bLower.startsWith(searchTerm);

        if (aStartsWith && !bStartsWith) return -1;
        if (!aStartsWith && bStartsWith) return 1;

        const aIndex = aLower.indexOf(searchTerm);
        const bIndex = bLower.indexOf(searchTerm);
        return aIndex - bIndex;
      });

    setFilteredSuggestions(filtered);
    setIsOpen(true);
    setHighlightedIndex(-1);
  }, [inputValue, suggestions]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSelect = (value: string) => {
    setInputValue(clearOnSelect ? "" : value);
    setIsOpen(false);
    setHighlightedIndex(-1);
    onSelect?.(value);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (isComposing) {
        return;
      }

      e.preventDefault();

      // If an item is highlighted, select it
      if (highlightedIndex >= 0 && filteredSuggestions.length > 0) {
        handleSelect(filteredSuggestions[highlightedIndex]);
        return;
      }

      // If exact match exists in suggestions, select it
      const exactMatch = suggestions.find(
        (s) => s.toLowerCase() === inputValue.trim().toLowerCase()
      );
      if (exactMatch) {
        handleSelect(exactMatch);
        return;
      }

      // If there's only one filtered suggestion, select it
      if (filteredSuggestions.length === 1) {
        handleSelect(filteredSuggestions[0]);
        return;
      }
    }

    if (!isOpen || filteredSuggestions.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < filteredSuggestions.length - 1 ? prev + 1 : 0
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev > 0 ? prev - 1 : filteredSuggestions.length - 1
        );
        break;
      case "Escape":
        setIsOpen(false);
        setHighlightedIndex(-1);
        break;
    }
  };

  useEffect(() => {
    if (highlightedIndex >= 0 && listRef.current) {
      const highlightedElement = listRef.current.children[
        highlightedIndex
      ] as HTMLElement;
      highlightedElement?.scrollIntoView({ block: "nearest" });
    }
  }, [highlightedIndex]);

  return (
    <div className="relative w-full max-w-sm">
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onCompositionStart={() => setIsComposing(true)}
        onCompositionEnd={() => setIsComposing(false)}
        onBlur={() => {
          setTimeout(() => setIsOpen(false), 150);
        }}
        onFocus={() => {
          if (filteredSuggestions.length > 0) {
            setIsOpen(true);
          }
        }}
        placeholder={placeholder}
        className="w-full rounded-lg border border-input bg-background px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        aria-autocomplete="list"
        aria-expanded={isOpen}
        aria-controls="autocomplete-list"
        role="combobox"
      />

      {isOpen && inputValue.trim() !== "" && (
        <ul
          ref={listRef}
          id="autocomplete-list"
          role="listbox"
          className="absolute z-10 mt-1 w-full max-h-60 overflow-y-auto rounded-lg border border-border bg-popover shadow-lg"
        >
          {filteredSuggestions.length > 0 ? (
            filteredSuggestions.map((suggestion, index) => (
              <li
                key={suggestion}
                role="option"
                aria-selected={highlightedIndex === index}
                onClick={() => handleSelect(suggestion)}
                className={cn(
                  "cursor-pointer px-4 py-2 text-popover-foreground transition-colors",
                  highlightedIndex === index
                    ? "bg-accent text-accent-foreground"
                    : "hover:bg-accent/50"
                )}
              >
                {suggestion}
              </li>
            ))
          ) : (
            <li className="px-4 py-2 text-muted-foreground cursor-default">
              카드를 찾을 수 없습니다
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
