import { ReactElement } from "react";
import ToggleButton from "./ToggleButton";

type ToggleFilterProps = {
  title: string;
  children: ReactElement<ToggleFilterProps, typeof ToggleButton>[];
};

export default function ToggleFilter({ title, children }: ToggleFilterProps) {
  return (
    <div className="flex flex-col justify-start gap-4 md:items-center md:justify-center">
      <p className="text-sm font-bold uppercase text-white">{title}</p>
      <div className="flex flex-wrap items-center justify-start gap-3 md:justify-center">
        {children}
      </div>
    </div>
  );
}
