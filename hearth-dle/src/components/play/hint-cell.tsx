import { cn } from "@/lib/utils";
import { THint } from "@/types/play";
import { ChevronDown, ChevronUp } from "lucide-react";
import { hintCellBgColor } from "./hint-cell-bg-color";

interface IHintCell {
  value: string | number | null;
  status: THint;
  isNumeric?: boolean;
  animate?: boolean;
}

export function HintCell({
  value,
  status,
  isNumeric = false,
  animate = false,
}: IHintCell) {
  const bgColor = hintCellBgColor[status];

  const displayValue = value === null ? "-" : value;

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-2 rounded-lg w-[60px] h-[60px] text-white font-medium text-sm",
        bgColor,
        animate && "animate-in zoom-in-50 duration-300"
      )}
    >
      <span className="text-center break-words">{displayValue}</span>
      {isNumeric && status === "higher" && <ChevronUp className="w-4 h-4" />}
      {isNumeric && status === "lower" && <ChevronDown className="w-4 h-4" />}
      {status === "correct"}
      {status === "partial"}
    </div>
  );
}
