import { THint } from "@/types/play";
import { cn } from "@/lib/utils";
import { hintCellBgColor } from "./hint-cell-bg-color";

interface IArrayHintCell {
  values: string[];
  status: THint;
  animate?: boolean;
}

export function ArrayHintCell({
  values,
  status,
  animate = false,
}: IArrayHintCell) {
  const bgColor = hintCellBgColor[status];

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-2 rounded-lg w-[60px] h-[60px] text-white font-medium text-xs",
        bgColor,
        animate && "animate-in zoom-in-50 duration-300"
      )}
    >
      {values.length === 0 ? (
        <span>-</span>
      ) : (
        <span className="text-center">{values.join(", ")}</span>
      )}
      {status === "correct"}
      {status === "partial"}
    </div>
  );
}
