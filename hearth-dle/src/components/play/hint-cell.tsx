import { cn } from "@/lib/utils";
import { THint } from "@/types/play";
import { ChevronDown, ChevronUp } from "lucide-react";

export function HintCell({
  value,
  status,
  isNumeric = false,
  animate = false,
}: {
  value: string | number | null;
  status: THint;
  isNumeric?: boolean;
  animate?: boolean;
}) {
  const bgColor = {
    correct: "bg-green-500",
    wrong: "bg-red-500",
    higher: "bg-amber-500",
    lower: "bg-amber-500",
    partial: "bg-yellow-500",
  }[status];

  const displayValue = value === null ? "-" : value;

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-2 rounded-lg min-w-[60px] min-h-[60px] text-white font-medium text-sm",
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
