import type { ImgHTMLAttributes } from "react";
import Image from "@app/components/Image";

type MoviePosterProps = ImgHTMLAttributes<HTMLImageElement>;

export default function MoviePoster({ className, ...rest }: MoviePosterProps) {
  return (
    <div
      className={`overflow-hidden rounded shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] ${className}`}
    >
      <Image {...rest} />
    </div>
  );
}
