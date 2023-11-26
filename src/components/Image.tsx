type ImageProps = {
  src: string | null;
  alt: string;
};

function ImagePlaceholder() {
  return (
    <div className="flex h-[inherit] min-h-[inherit] flex-col place-content-center bg-gray-100">
      <span className="text-center text-sm text-gray-300">Sem imagem</span>
    </div>
  );
}

export default function Image({ src, alt }: ImageProps) {
  return src ? (
    <img className="h-[inherit] min-h-[inherit]" src={src} alt={alt} />
  ) : (
    <ImagePlaceholder />
  );
}
