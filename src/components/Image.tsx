import type { ImgHTMLAttributes } from "react";

type ImageProps = ImgHTMLAttributes<HTMLImageElement>;

function ImagePlaceholder() {
  return (
    <div className="flex h-full min-h-[inherit] flex-col place-content-center bg-gray-100">
      <span className="text-center text-sm text-gray-300">Sem imagem</span>
    </div>
  );
}

export default function Image({ src, ...rest }: ImageProps) {
  return src ? (
    <img
      className="h-[inherit] max-h-[inherit] min-h-[inherit]"
      src={src}
      {...rest}
    />
  ) : (
    <ImagePlaceholder />
  );
}
