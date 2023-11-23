import type {
  ButtonHTMLAttributes,
  ImgHTMLAttributes,
  MouseEventHandler,
} from "react";
import closeSvg from "@app/assets/close-icon.svg";

type ToggleButtonProps = {
  label: string;
  onClear: MouseEventHandler<HTMLImageElement>;
  toggle?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

function ClearButton({ onClick }: ImgHTMLAttributes<HTMLImageElement>) {
  return (
    <img
      src={closeSvg}
      alt="close-icon"
      className="m-auto cursor-pointer"
      onClick={onClick}
    />
  );
}

export default function ToggleButton({
  label,
  onClick,
  onClear,
  toggle = false,
}: ToggleButtonProps) {
  const classes = toggle ? "bg-[#d18000] text-white" : "bg-white";

  const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    if (!toggle && onClick) {
      onClick(event);
    }
  };

  const handleClearClick: MouseEventHandler<HTMLImageElement> = (event) => {
    event.stopPropagation();

    if (onClear) {
      onClear(event);
    }
  };

  return (
    <button
      className={`flex place-content-center gap-2 rounded px-4 py-2 font-bold ${classes}`}
      onClick={handleClick}
    >
      <p>{label}</p>
      {toggle && <ClearButton onClick={handleClearClick} />}
    </button>
  );
}
