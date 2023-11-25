type CardProps = {
  imgSrc: string | null;
  imgAlt: string;
  title: string;
  description: string;
};

function ImagePlaceholder() {
  return (
    <div className="flex h-[inherit] flex-col place-content-center bg-gray-100">
      <span className="text-center text-sm text-gray-300">Sem imagem</span>
    </div>
  );
}

export default function Card({
  imgSrc,
  imgAlt,
  title,
  description,
}: CardProps) {
  return (
    <div className="col-span-2 flex flex-col gap-2 bg-white">
      {imgSrc ? (
        <div className="overflow-hidden rounded border border-[#e7e7e7]">
          <img src={imgSrc} alt={imgAlt} />
        </div>
      ) : (
        <div className="h-full overflow-hidden rounded border border-[#e7e7e7]">
          <ImagePlaceholder />
        </div>
      )}
      <div>
        <p className="text-base font-bold">{title}</p>
        <p className="text-sm font-bold uppercase text-[#646464]">
          {description}
        </p>
      </div>
    </div>
  );
}
