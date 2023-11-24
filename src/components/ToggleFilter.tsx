import { ReactElement } from "react";
import ToggleButton from "./ToggleButton";

type ToggleFilterProps = {
  title: string;
  children: ReactElement<ToggleFilterProps, typeof ToggleButton>[];
};

export default function ToggleFilter({ title, children }: ToggleFilterProps) {
  return (
    <div className="flex flex-col place-content-center gap-4">
      <p className="text-center text-sm font-bold uppercase text-white">
        {title}
      </p>
      <div className="flex flex-wrap place-content-center gap-3">
        {children}
      </div>
    </div>
  );
}
