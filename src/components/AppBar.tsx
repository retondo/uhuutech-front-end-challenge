import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import type { PropsWithChildren } from "react";

type AppBarProps = {
  className?: string;
} & PropsWithChildren;

export default function AppBar({ children, className }: AppBarProps) {
  const [isDOMReady, setIsDOMReady] = useState(false);

  useEffect(() => {
    setIsDOMReady(true);
  }, []);

  return isDOMReady
    ? createPortal(
        <div
          className={`content-px bg-secondary flex flex-col place-content-center gap-20 py-40 ${className}`}
        >
          {children}
        </div>,
        document.querySelector("#app-bar")!,
      )
    : null;
}
