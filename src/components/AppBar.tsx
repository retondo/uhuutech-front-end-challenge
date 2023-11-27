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
          className={`sm:page-mx md:page-mx lg:page-mx xl:page-mx 2xl:page-mx flex flex-col items-center justify-center gap-9 bg-secondary py-8 md:py-12 lg:py-16 xl:gap-20 xl:py-20 2xl:py-24 ${className}`}
        >
          {children}
        </div>,
        document.querySelector("#app-bar")!,
      )
    : null;
}
