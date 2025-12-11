import { THint } from "@/types/play";
import { cn } from "@/lib/utils";

export function ArrayHintCell({
  values,
  status,
  animate = false,
}: {
  values: string[];
  status: THint;
  animate?: boolean;
}) {
  const bgColor = {
    correct: "bg-green-500",
    wrong: "bg-red-500",
    higher: "bg-amber-500",
    lower: "bg-amber-500",
    partial: "bg-yellow-500",
  }[status];

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-2 rounded-lg min-w-[60px] min-h-[60px] text-white font-medium text-xs",
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
