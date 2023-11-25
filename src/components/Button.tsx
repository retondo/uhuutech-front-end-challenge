import type { HTMLAttributes } from "react";

export default function Button({
  className,
  ...rest
}: HTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`flex place-content-center gap-2 rounded px-4 py-2 text-base font-bold ${className}`}
      {...rest}
    />
  );
}
