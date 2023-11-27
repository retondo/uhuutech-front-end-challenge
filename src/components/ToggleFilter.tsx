import { ReactElement } from "react";
import ToggleButton from "./ToggleButton";

type ToggleFilterProps = {
  title: string;
  children: ReactElement<ToggleFilterProps, typeof ToggleButton>[];
};

export default function ToggleFilter({ title, children }: ToggleFilterProps) {
  return (
    <div className="flex flex-col items-center justify-start gap-4 md:justify-center">
      <p className="text-left text-sm font-bold uppercase text-white md:text-center">
        {title}
      </p>
      <div className="flex flex-wrap place-content-center gap-3">
        {children}
      </div>
    </div>
  );
}
