import type { CSSProperties } from "react";
import "./CircleProgress.css";

type CircleProgressProps = {
  /**
   * Number between 0 and 100.
   */
  value: number;
  label: string;
  className?: string;
};

export default function CircleProgress({
  value = 0,
  label,
  className,
}: CircleProgressProps) {
  let textColorClass = "text-[#ff0000]";
  let strokeColorClass = "stroke-[#ff0000]";

  if (value >= 0 && value <= 100) {
    if (value >= 60) {
      textColorClass = "text-[#00ff00]";
      strokeColorClass = "stroke-[#00ff00]";
    } else if (value >= 50) {
      textColorClass = "text-[#ffff00]";
      strokeColorClass = "stroke-[#ffff00]";
    }
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div
        className={`relative flex h-[60px] w-[60px] gap-2 rounded-full bg-white/10 ${textColorClass}`}
      >
        <p className="m-auto font-bold">{value}%</p>
        <div className="absolute">
          <svg className="relative h-[60px] w-[60px] -rotate-90">
            <circle
              style={{ "--percent": value } as CSSProperties}
              className={`h-full w-full fill-none ${strokeColorClass} stroke-[4px]`}
              cx="30"
              cy="30"
              r="28"
            ></circle>
          </svg>
        </div>
      </div>
      <p className="text-base">{label}</p>
    </div>
  );
}
